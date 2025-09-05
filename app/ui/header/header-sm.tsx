'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/nav/nav-links';
import CreolitosLogoSM from '@/app/ui/creolitos-logo-sm';
import LogInButton from '@/app/ui/auth/signout-button';
import { useAuth } from '@/app/lib/auth-context';

export default function Header() {
  const { user, userRole, isLoading } = useAuth();

  return (
    <div className="sticky top-0 shadow bg-creoCont-neutral1 w-full">
      <div className="flex grow flex-row items-center justify-between space-y-2 md:flex-row md:space-y-0 md:space-x-2">

        <Link
          className="flex flex-row mb-2 rounded-md p-4 justify-center"
          href="/"
        >
          <CreolitosLogoSM />
        </Link>
        <NavLinks />
        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}

        <div className="basis-64 flex flex-row items-stretch justify-end">
          {!isLoading && (
            <LogInButton user={user} userRole={userRole} />
          )}
        </div>
      </div>
    </div>
  );
}
