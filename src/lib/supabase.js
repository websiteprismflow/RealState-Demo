import { createClient } from '@supabase/supabase-js';

// Direct static access so Vite/Next bundlers can statically replace environment variables
const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.NEXT_PUBLIC_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_URL) ||
  'https://kviyodhtxtuzpwgrdouc.supabase.co';

const supabasePublishableKey = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
  (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
  'sb_publishable_N0m40eLClVG44SL5S8aWog_UfLdfBBD';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabasePublishableKey && 
    supabasePublishableKey !== 'placeholder-anon-key'
  );
};

// Initialize Browser-Safe Public Client (Uses only public publishable key, enforces RLS)
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
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
      console.warn('[Audit Log] Notice:', error.message);
    }
  } catch (err) {
    console.warn('[Audit Log] Error writing audit log:', err);
  }
}

/**
 * Verifies if the authenticated user exists in `public.admin_users` with `enabled = true`
 * @param {string} userId - The Supabase auth user UUID (auth.uid())
 * @returns {Promise<{ isAdmin: boolean, role: string|null, enabled: boolean, error?: string }>}
 */
export async function checkAdminUser(userId) {
  if (!userId) {
    return { isAdmin: false, role: null, enabled: false, error: 'No user ID provided' };
  }

  try {
    // 1. Primary check: Query public.admin_users by exact user_id UUID and enabled = true
    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id, role, enabled')
      .eq('user_id', userId)
      .eq('enabled', true)
      .maybeSingle();

    if (adminError) {
      console.error('[Supabase admin_users query error]:', adminError.message, adminError);
    }

    if (admin) {
      console.log('[Supabase Authorization Success]: Admin record verified for UUID:', userId, 'Role:', admin.role);
      return { 
        isAdmin: true, 
        role: admin.role || 'owner', 
        enabled: true 
      };
    }

    // 2. Check if admin record exists but is disabled (enabled = false)
    const { data: disabledCheck } = await supabase
      .from('admin_users')
      .select('user_id, role, enabled')
      .eq('user_id', userId)
      .maybeSingle();

    if (disabledCheck) {
      if (disabledCheck.enabled !== true) {
        return {
          isAdmin: false,
          role: disabledCheck.role,
          enabled: false,
          error: 'Your administrator account has been disabled.'
        };
      }
      return {
        isAdmin: true,
        role: disabledCheck.role || 'owner',
        enabled: true
      };
    }

    // 3. Check for security definer RPC function if defined in Supabase
    try {
      const { data: rpcResult } = await supabase.rpc('is_admin');
      if (rpcResult === true) {
        return { isAdmin: true, role: 'owner', enabled: true };
      }
    } catch {
      // RPC check is optional
    }

    console.warn(`[admin_users Lookup] No admin_users row found for user_id: ${userId}`);
    return { 
      isAdmin: false, 
      role: null, 
      enabled: false, 
      error: 'Your account does not have administrator access.' 
    };
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
    // 1. Direct Authenticate with Supabase Auth
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (authError) {
      console.warn('[Supabase Auth Sign-In Error]:', authError.message);
      return { success: false, error: authError.message || 'Invalid login credentials.' };
    }

    // 2. Directly verify user and session from signInWithPassword response
    if (!data || !data.user || !data.session) {
      console.warn('[Supabase Auth Response Warning]: signInWithPassword did not return a session/user object.');
      return { success: false, error: 'Authentication did not produce a usable session.' };
    }

    const user = data.user;
    const session = data.session;

    // Safe development diagnostic
    console.log('[Supabase Auth Success]', {
      hasSession: Boolean(session),
      hasUser: Boolean(user),
      userId: user.id,
      email: user.email,
    });

    // 3. Query public.admin_users using the authenticated user's exact UUID (user.id)
    const adminCheck = await checkAdminUser(user.id);

    if (!adminCheck.isAdmin) {
      // User is authenticated in Auth but unauthorized or disabled in admin_users -> force sign out
      await supabase.auth.signOut();
      return { 
        success: false, 
        error: adminCheck.error || 'Your account does not have administrator access.' 
      };
    }

    // 4. Log Successful Admin Login in Audit Trail
    await recordAuditLog({
      action: 'ADMIN_LOGIN',
      entityType: 'AUTH_SESSION',
      entityId: user.id,
      metadata: { email: user.email, role: adminCheck.role },
    });

    return {
      success: true,
      user: user,
      session: session,
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
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session || !session.user) return null;

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
