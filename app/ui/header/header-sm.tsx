'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/nav/nav-links';
import {CreolitosLogoSM} from '@/app/ui/creolitos-logo';
import LogInButton from '@/app/ui/auth/signout-button';
import { useAuth } from '@/app/lib/auth-context';

export default function Header() {
  const { user, userRole, isLoading } = useAuth();

  return (
    <div className="sticky z-50 top-0 shadow bg-creoCont-neutral1 w-full">
      <div className="flex h-20 flex-row items-center justify-around md:space-x-2">

        <Link
          className="p-1 grow-2"
          href="/"
        >
          <CreolitosLogoSM />
        </Link>
        <NavLinks />

        <div className="basis-48 flex flex-row items-stretch justify-end">
          {!isLoading && (
            <LogInButton user={user} userRole={userRole} />
          )}
        </div>
      </div>
    </div>
  );
}
