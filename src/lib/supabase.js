import { createClient } from '@supabase/supabase-js';

// Resolve environment variables across Next.js and Vite environments
const getEnvVar = (key) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return '';
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabasePublishableKey = getEnvVar('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabasePublishableKey);
};

// Initialize Supabase Client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Verifies if the authenticated user exists in `public.admin_users` and has `enabled = true`
 * @param {string} userId - The Supabase auth user UUID
 * @returns {Promise<{ isAdmin: boolean, role: string|null, enabled: boolean, error?: string, failureReason?: string }>}
 */
export async function checkAdminUser(userId) {
  if (!userId) {
    return { isAdmin: false, role: null, enabled: false, error: 'No user ID provided', failureReason: 'INVALID_USER_ID' };
  }

  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id, role, enabled')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('[Layer G: RLS/Database Error] admin_users check error:', error.message);
      return { isAdmin: false, role: null, enabled: false, error: error.message, failureReason: 'DB_ERROR' };
    }

    if (!data) {
      console.warn('[Layer E: admin_users Row Missing] User authenticated in Auth but not in admin_users table.');
      return { isAdmin: false, role: null, enabled: false, error: 'Your account does not have administrator access.', failureReason: 'ROW_MISSING' };
    }

    if (data.enabled !== true) {
      console.warn('[Layer F: admin_users Disabled] Administrator account has enabled = false.');
      return { isAdmin: false, role: data.role, enabled: false, error: 'Your administrator account has been disabled.', failureReason: 'ACCOUNT_DISABLED' };
    }

    return { isAdmin: true, role: data.role || 'Admin', enabled: true };
  } catch (err) {
    console.error('[Layer G: Database Query Exception]', err);
    return { isAdmin: false, role: null, enabled: false, error: err.message, failureReason: 'EXCEPTION' };
  }
}

/**
 * Handles the complete Supabase Admin Authentication and Role Verification flow
 * @param {string} email
 * @param {string} password
 */
export async function loginAdminWithSupabase(email, password) {
  // Layer A: Environment Variables Check
  if (!isSupabaseConfigured()) {
    console.error('[Layer A: Missing Env Variables] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is undefined.');
    return { 
      success: false, 
      error: 'Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.' 
    };
  }

  if (!email || !password) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  try {
    // Layer C & D: Supabase Auth Check
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });

    if (authError) {
      console.warn('[Layer C/D: Auth Failure]', authError.message);
      return { success: false, error: authError.message || 'Invalid login credentials.' };
    }

    if (!authData || !authData.user) {
      return { success: false, error: 'Authentication failed. Please try again.' };
    }

    // Layer E & F: Role and Enabled Status Check in public.admin_users
    const adminCheck = await checkAdminUser(authData.user.id);

    if (!adminCheck.isAdmin) {
      // Sign out unauthorized user from browser session
      await supabase.auth.signOut();
      return { success: false, error: adminCheck.error || 'Your account does not have administrator access.' };
    }

    // Success - Fully Verified Administrator
    return {
      success: true,
      user: authData.user,
      session: authData.session,
      adminRole: adminCheck.role
    };
  } catch (err) {
    console.error('[Layer B: Supabase Client Exception]', err);
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
