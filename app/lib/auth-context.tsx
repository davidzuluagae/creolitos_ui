'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/supabaseClient';
import { User } from '@supabase/supabase-js';
import { getUserRoleFromJWT } from '@/utils/supabase/roleUtils';
import { usePathname } from 'next/navigation';

// Define the shape of your auth context
interface AuthContextType {
  user: User | null;
  userRole: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isAdmin: false,
  isLoading: true,
  checkAuth: async () => {},
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// The provider component that wraps your app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const pathname = usePathname();

  // Function to check authentication status
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      // Set user if session exists
      if (session) {
        setUser(session.user);
        
        // Use the enhanced roleUtils utility to get user role from JWT
        const { role, isAdmin: hasAdminRole } = await getUserRoleFromJWT(supabase);
        setUserRole(role);
        setIsAdmin(hasAdminRole);
      } else {
        setUser(null);
        setUserRole(null);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
      setUserRole(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth status when the component mounts
  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      checkAuth();
      
      // Set up a listener for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            setUser(session.user);
            
            // Update role when auth state changes using enhanced roleUtils
            const { role, isAdmin: hasAdminRole } = await getUserRoleFromJWT(supabase);
            setUserRole(role);
            setIsAdmin(hasAdminRole);
          } else {
            setUser(null);
            setUserRole(null);
            setIsAdmin(false);
          }
        }
      );
      
      // Clean up the subscription
      return () => {
        subscription?.unsubscribe();
      };
    } else {
      setIsLoading(false);
      setUser(null);
      setUserRole(null);
      setIsAdmin(false);
    }
  }, [supabase, pathname]);

  const value = {
    user,
    userRole,
    isAdmin,
    isLoading,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}