'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavButton from '../nav/nav-button';
import { createClient } from '@/utils/supabase/supabaseClient';
import { UserIcon } from '@heroicons/react/24/outline';
import { User } from '@supabase/supabase-js';
import ElDropdown from '../el-dropdown';
import ElMenu from '../el-menu';

interface LogInButtonProps {
  user?: User | null;
  userRole?: string | null;
}

export default function LogInButton({ user, userRole }: LogInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      // Create Supabase client locally when needed
      const supabase = createClient();

      // Call the server-side signout endpoint
      const response = await fetch('/auth/signout', {
        method: 'POST',
        credentials: 'include', // Important for cookies
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Server-side sign out failed');
      }

      // Also sign out on the client side
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      // After successful signout, refresh the router and redirect
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return !!user ? (
    <ElDropdown
      buttonContent={
        <>
          <span className="mr-2 text-md hidden md:inline-block">
            {user?.email || ''}
          </span>
          <span className="mr-2 text-sm hidden md:inline-block">
            {userRole || ''}
          </span>
        </>
      }
    >
      <ElMenu>
        <div className="flex flex-col gap-2 p-2">
          <NavButton name="Profile" href="/profile" icon={UserIcon} />
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="flex grow justify-center items-center gap-2 rounded-full bg-orange-100 border-2 border-black p-3 text-lg font-medium hover:bg-yellow-950 hover:text-yellow-50 md:justify-start md:p-2 md:px-3 disabled:bg-gray-300 disabled:text-gray-500"
            aria-label="Sign out"
          >
            <PowerIcon className="w-8" />
            <p className="hidden md:block">
              {isLoading ? 'Signing out...' : 'Sign Out'}
            </p>
          </button>
        </div>
      </ElMenu>
    </ElDropdown>
  ) : (
    <NavButton name="Sign In" href="/login" icon={PowerIcon} />
  );
}