import { createClient } from '@supabase/supabase-js';

// Resolve environment variables safely across Vite and Next/Process environments
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

// Initialize Browser-Safe Public Client (Uses only public publishable key, enforces RLS)
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
 * Audit Logging Helper — Records administrative mutations into `public.audit_logs`
 */
export async function recordAuditLog({ action, entityType, entityId, metadata = {} }) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const actorId = session?.user?.id || 'anonymous';

    const { error } = await supabase.from('audit_logs').insert([
      {
        actor_id: actorId,
        action: action,
        entity_type: entityType,
        entity_id: String(entityId || ''),
        metadata: metadata,
        timestamp: new Date().toISOString(),
      },
    ]);

    if (error) {
      // Non-blocking warning: table may not have been migrated yet
      console.warn('[Audit Log] Notice:', error.message);
    }
  } catch (err) {
    console.warn('[Audit Log] Error writing audit log:', err);
  }
}

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
      .maybeSingle();

    if (error) {
      console.error('[admin_users query error]:', error.message);
      return { isAdmin: false, role: null, enabled: false, error: error.message };
    }

    if (!data) {
      return { isAdmin: false, role: null, enabled: false, error: 'Your account does not have administrator access.' };
    }

    if (data.enabled !== true) {
      return { isAdmin: false, role: data.role, enabled: false, error: 'Your administrator account has been disabled.' };
    }

    return { isAdmin: true, role: data.role || 'admin', enabled: true };
  } catch (err) {
    console.error('Error verifying admin user:', err);
    return { isAdmin: false, role: null, enabled: false, error: err.message };
  }
}

/**
 * Handles the complete Supabase Admin Authentication and Role Verification flow
 */
export async function loginAdminWithSupabase(email, password) {
  if (!isSupabaseConfigured()) {
    return { 
      success: false, 
      error: 'Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.' 
    };
  }

  if (!email || !password) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  try {
    // 1. Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
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
      // User is in Auth but unauthorized in admin_users -> force sign out
      await supabase.auth.signOut();
      return { success: false, error: adminCheck.error || 'Your account does not have administrator access.' };
    }

    // 3. Log Successful Admin Login
    await recordAuditLog({
      action: 'ADMIN_LOGIN',
      entityType: 'AUTH_SESSION',
      entityId: authData.user.id,
      metadata: { email: authData.user.email, role: adminCheck.role },
    });

    return {
      success: true,
      user: authData.user,
      session: authData.session,
      adminRole: adminCheck.role,
    };
  } catch (err) {
    console.error('Login exception:', err);
    return { success: false, error: err.message || 'An unexpected authentication error occurred.' };
  }
}

/**
 * Logs out the current admin session
 */
export async function logoutAdmin() {
  try {
    await recordAuditLog({
      action: 'ADMIN_LOGOUT',
      entityType: 'AUTH_SESSION',
      entityId: 'current',
    });
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Logout error:', err);
  }
}

/**
 * Verifies active Supabase session on mount or refresh
 */
export async function getValidatedAdminSession() {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session || !session.user) return null;

    const adminCheck = await checkAdminUser(session.user.id);
    if (!adminCheck.isAdmin) {
      await supabase.auth.signOut();
      return null;
    }

    return {
      session,
      user: session.user,
      adminRole: adminCheck.role,
    };
  } catch (err) {
    console.error('Session validation error:', err);
    return null;
  }
}

/**
 * Upload Property Media to Supabase Storage Bucket
 * Enforces MIME type & size restrictions on upload
 */
export async function uploadPropertyMediaFile(file, propertyId = 'general') {
  if (!file) return { success: false, error: 'No file provided' };

  // Validate Allowed MIME Types
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
  const isImage = allowedImageTypes.includes(file.type);
  const isVideo = allowedVideoTypes.includes(file.type);

  if (!isImage && !isVideo) {
    return { success: false, error: 'Unsupported file format. Please upload JPEG, PNG, WebP, AVIF, or MP4/WebM video.' };
  }

  // Size limit: 15MB for images, 60MB for videos
  const maxBytes = isImage ? 15 * 1024 * 1024 : 60 * 1024 * 1024;
  if (file.size > maxBytes) {
    return { success: false, error: `File size exceeds the limit (${isImage ? '15MB' : '60MB'}).` };
  }

  try {
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${propertyId}/${Date.now()}_${sanitizedName}`;

    const { data, error } = await supabase.storage
      .from('property-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase Storage error:', error.message);
      return { success: false, error: error.message };
    }

    // Get public/signed URL
    const { data: publicUrlData } = supabase.storage
      .from('property-media')
      .getPublicUrl(filePath);

    await recordAuditLog({
      action: 'MEDIA_UPLOADED',
      entityType: 'PROPERTY_MEDIA',
      entityId: propertyId,
      metadata: { path: filePath, size: file.size, type: file.type },
    });

    return {
      success: true,
      url: publicUrlData?.publicUrl || filePath,
      path: filePath,
      mediaType: isImage ? 'image' : 'video',
    };
  } catch (err) {
    console.error('Storage upload exception:', err);
    return { success: false, error: err.message };
  }
}
