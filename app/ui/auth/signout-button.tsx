'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavButton from '../nav/nav-button';
import { createClient } from '@/utils/supabase/supabaseClient';
import { UserIcon } from '@heroicons/react/24/outline';
import { User } from '@supabase/supabase-js';
import { Menu, MenuButton, MenuItem, MenuItems, Button } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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

    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className='flex items-center gap-2 px-4 py-2 rounded-xl bg-creoPri-200 text-white font-medium hover:bg-creoPri-100 transition-colors'>
        <span className="mr-2 font-medium hidden md:inline-block">
          {user?.email || ''}
        </span>
        <span className="mr-2 text-xs text-creoLim-200 hidden md:inline-block">
          {userRole || ''}
        </span>
        <ChevronDownIcon className="size-5" aria-hidden="true" />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 absolute z-[9999] rounded-xl border border-creoSec-300 bg-creoCont-neutral1 shadow-lg transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0">
        <MenuItem key={1} as="div" className="w-full">
          <Link
            href="/profile"
            className="flex w-full justify-start items-center gap-2 px-4 py-2 hover:bg-creoSec-100 cursor-pointer text-creoLim-300"
          >
            <UserIcon className="w-8" />
            <p className="hidden md:block">Profile</p>
          </Link>
        </MenuItem>
        <MenuItem key={2} as="div" className="w-full">
          <Button
            onClick={handleSignOut}
            disabled={isLoading}
            className="flex w-full justify-start items-center gap-2 px-4 py-2 text-red-600 hover:bg-creoSec-200 cursor-pointer disabled:bg-gray-300 disabled:text-gray-500"
            aria-label="Sign out"
          >
            <PowerIcon className="w-8" />
            <p className="hidden md:block">
              {isLoading ? 'Signing out...' : 'Sign Out'}
            </p>
          </Button>
        </MenuItem>
      </MenuItems>
    </Menu>
  ) : (
    <NavButton name="Sign In" href="/login" icon={PowerIcon}/>
  );
}