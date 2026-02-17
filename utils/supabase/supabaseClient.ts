'use client';

import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'
import { getUserRoleFromJWT } from './roleUtils'

/**
 * Creates a standard Supabase client for browser client components
 */
export function createClient() {
  if (process.env.NEXT_PUBLIC_SUPABASE_DISABLED === 'true') {
    return null;
  }
  if (typeof window === 'undefined') {
    return null;
  }
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, options) => {
          if (process.env.NODE_ENV !== 'production') {
            // Log the complete URL and request details in development
            console.log('🔍 Supabase Browser Request:', {
              url: url.toString(),
              method: options?.method,
            });
            
            // Check specifically for 'role=' in the URL as a security measure
            if (url.toString().includes('role=')) {
              console.warn('⚠️ WARNING: Client URL contains role parameter:', url.toString());
            }
          }
          
          return fetch(url, options);
        }
      }
    }
  )
}

/**
 * Creates an authenticated client with role information for client components
 * Similar to server-side createAuthenticatedClient but for browser context
 */
export async function createAuthenticatedClient() {
  const supabase = createClient();
  if (!supabase) {
    return { client: null, role: 'none', isAdmin: false };
  }
  
  try {
    // Get current session and role information
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('No valid JWT token found in browser – returning unauthenticated client');
      }
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
    console.error('Error creating authenticated client in browser:', error);
    return { 
      client: supabase, 
      role: 'none', 
      isAdmin: false 
    };
  }
}
