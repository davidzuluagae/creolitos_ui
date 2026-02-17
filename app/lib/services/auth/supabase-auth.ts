'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { getUserRoleFromJWT } from '@/utils/supabase/roleUtils';

export function createAuthService() {
  const client = createClient();
  if (!client) {
    return null;
  }

  return {
    client,
    getSession: () => client.auth.getSession(),
    onAuthStateChange: (
      callback: Parameters<typeof client.auth.onAuthStateChange>[0]
    ) => client.auth.onAuthStateChange(callback),
    signInWithPassword: (email: string, password: string) =>
      client.auth.signInWithPassword({ email, password }),
    signUp: (email: string, password: string, emailRedirectTo: string) =>
      client.auth.signUp({ email, password, options: { emailRedirectTo } }),
    resetPasswordForEmail: (email: string, redirectTo: string) =>
      client.auth.resetPasswordForEmail(email, { redirectTo }),
    signOut: () => client.auth.signOut(),
    getUserRole: () => getUserRoleFromJWT(client),
  };
}
