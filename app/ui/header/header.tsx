'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/nav/nav-links';
import CreolitosLogo from '@/app/ui/creolitos-logo';
import LogInButton from '@/app/ui/auth/signout-button';
import { useAuth } from '@/app/lib/auth-context';

export default function Header() {
  const { user, userRole, isLoading } = useAuth();
  
  return (
    <div className="relative">
      {/* Container with background */}
      <div className="flex flex-col justify-center items-stretch px-4 py-3 md:py-2 bg-[url('/stock_bg.png')] bg-repeat">
        {/* Gradient overlays for fading border */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

        {/* Content */}
        <Link
          className="flex flex-row mb-2 rounded-md p-4 justify-center relative z-10"
          href="/"
        >
          <CreolitosLogo />
        </Link>

        <div className="flex grow flex-row items-center justify-between space-y-2 md:flex-row md:space-y-0 md:space-x-2 relative z-10">
          <NavLinks />
          {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}

          <div className="basis-64 flex flex-row items-stretch justify-end">
            {!isLoading && (
                <LogInButton user={user} userRole={userRole} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
