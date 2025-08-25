'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavButton from '../nav/nav-button';
import { createClient } from '@/utils/supabase/supabaseClient';

interface LogInButtonProps {
  isLoggedIn: boolean;
}

export default function LogInButton({ isLoggedIn }: LogInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
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
      
      // After successful signout, refresh the router and redirect
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoggedIn ? (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="flex grow justify-center items-center gap-2 rounded-full bg-red-200 border-2 border-black p-3 text-lg font-medium hover:bg-red-700 hover:text-yellow-50 md:justify-start md:p-2 md:px-3 disabled:bg-gray-300 disabled:text-gray-500"
      aria-label="Sign out"
    >
      <div className="hidden md:block">
        {isLoading ? 'Signing out...' : 'Sign Out'}
      </div>
      <PowerIcon className="w-6 h-6" />
    </button>
  ) : (
    <NavButton name="Sign In" href="/login" icon={PowerIcon} />
  );
}