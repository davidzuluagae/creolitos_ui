'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        router.refresh();
        router.push('/');
      } else {
        throw new Error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}