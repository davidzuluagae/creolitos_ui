import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import { getUserRoleFromJWT } from './roleUtils'

/**
 * Creates a standard Supabase client for server components
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      global: {
        fetch: (url, options) => {
          if (process.env.NODE_ENV !== 'production') {
            // Log the complete URL and request details to check for any role parameters
            console.log('🔍 Supabase API Request:', {
              url: url.toString(),
              method: options?.method,
            });
            
            // Check specifically for 'role=' in the URL
            if (url.toString().includes('role=')) {
              console.warn('⚠️ WARNING: URL contains role parameter:', url.toString());
            }
          }
          
          return fetch(url, options);
        },
      },
    }
  )
}

/**
 * Creates an authenticated client with JWT validation
 * Uses the existing client with its auth token
 */
export async function createAuthenticatedClient() {
  const supabase = await createClient();
  
  try {
    // Get current session and role information
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      console.warn('No valid JWT token found – returning unauthenticated client');
      return { client: supabase, role: 'none', isAdmin: false };
    }
    
    // Get user role from the JWT token
    const { role, isAdmin } = await getUserRoleFromJWT(supabase);
    
    return { 
      client: supabase, 
      role,
      isAdmin
    };
  } catch (error) {
    console.error('Error creating authenticated client:', error);
    return { 
      client: supabase, 
      role: 'none', 
      isAdmin: false 
    };
  }
}

/**
 * Gets a client and verifies admin role
 * Useful for admin-only actions
 */
export async function getAdminClient() {
  const { client, isAdmin } = await createAuthenticatedClient();
  
  if (!isAdmin) {
    throw new Error('Unauthorized: Admin role required');
  }
  
  return client;
}