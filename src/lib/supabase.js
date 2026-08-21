import { createClient } from '@supabase/supabase-js';

// Resolve environment variables safely across Vite and Next/Process environments
const getEnvVar = (key, viteKey) => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env[key]) return import.meta.env[key];
    if (viteKey && import.meta.env[viteKey]) return import.meta.env[viteKey];
  }
  if (typeof process !== 'undefined' && process.env) {
    if (process.env[key]) return process.env[key];
    if (viteKey && process.env[viteKey]) return process.env[viteKey];
  }
  return '';
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL') || 'https://placeholder.supabase.co';
const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'VITE_SUPABASE_ANON_KEY') || 'placeholder-anon-key';

export const isSupabaseConfigured = () => {
  return (
    supabaseUrl && 
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabaseAnonKey && 
    supabaseAnonKey !== 'placeholder-anon-key'
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Verifies if the authenticated user exists in `public.admin_users` and has `enabled = true`
 * @param {string} userId - The Supabase auth user UUID
 * @returns {Promise<{ isAdmin: boolean, role: string|null, enabled: boolean, error?: string }>}
 */
export async function checkAdminUser(userId) {
  if (!userId) {
    return { isAdmin: false, role: null, enabled: false, error: 'No user ID provided' };
  }

  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id, role, enabled')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.warn('admin_users check error:', error.message);
      return { isAdmin: false, role: null, enabled: false, error: error.message };
    }

    if (!data) {
      return { isAdmin: false, role: null, enabled: false, error: 'User not found in admin_users' };
    }

    if (data.enabled !== true) {
      return { isAdmin: false, role: data.role, enabled: false, error: 'Administrator account is disabled' };
    }

    return { isAdmin: true, role: data.role || 'Admin', enabled: true };
  } catch (err) {
    console.error('Error verifying admin status:', err);
    return { isAdmin: false, role: null, enabled: false, error: err.message };
  }
}

/**
 * Handles the complete Supabase Admin Authentication and Role Verification flow
 * @param {string} email
 * @param {string} password
 */
export async function loginAdminWithSupabase(email, password) {
  if (!email || !password) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  if (!isSupabaseConfigured()) {
    return { 
      success: false, 
      error: 'Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.' 
    };
  }

  try {
    // 1. Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });

    if (authError) {
      return { success: false, error: authError.message || 'Invalid login credentials.' };
    }

    if (!authData || !authData.user) {
      return { success: false, error: 'Authentication failed. Please try again.' };
    }

    // 2. Check public.admin_users table
    const adminCheck = await checkAdminUser(authData.user.id);

    if (!adminCheck.isAdmin) {
      // User is authenticated in Supabase Auth, but NOT authorized in admin_users table
      await supabase.auth.signOut();
      
      if (adminCheck.enabled === false && adminCheck.role) {
        return { success: false, error: 'Your administrator account has been disabled.' };
      }
      return { success: false, error: 'Your account does not have administrator access.' };
    }

    // 3. Success - Authorized Admin
    return {
      success: true,
      user: authData.user,
      session: authData.session,
      adminRole: adminCheck.role
    };
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, error: err.message || 'An unexpected error occurred.' };
  }
}

/**
 * Logs out the current admin session
 */
export async function logoutAdmin() {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Logout error:', err);
  }
}

/**
 * Verifies the current active Supabase session and ensures the user is a valid enabled admin
 */
export async function getValidatedAdminSession() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session || !session.user) {
      return null;
    }

    const adminCheck = await checkAdminUser(session.user.id);
    if (!adminCheck.isAdmin) {
      await supabase.auth.signOut();
      return null;
    }

    return {
      session,
      user: session.user,
      adminRole: adminCheck.role
    };
  } catch (err) {
    console.error('Session validation error:', err);
    return null;
  }
}
