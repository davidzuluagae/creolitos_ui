'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/nav/nav-links';
import { CreolitosLogo, CreolitosLogoSM } from '@/app/ui/creolitos-logo';
import LogInButton from '@/app/ui/auth/signout-button';
import { useAuth } from '@/app/lib/auth-context';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export default function Header() {
  const { user, userRole, isLoading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.scrollY > 110) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 10);

    handleScroll(); // Trigger scroll detection on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-creoCont-neutral1">
      <div className="flex justify-center pt-4">
        <Link className="p-1 w-72 creolitos-logo" href="/">
          <CreolitosLogo />
        </Link>
      </div>
      {isScrolled && <div className="h-14" />}
      <div
        className={`${isScrolled ? 'fixed top-0 left-0' : 'relative'} z-50 w-full transition-all duration-300 bg-creoCont-neutral1 shadow-md py-2`}
      >
        <div
          className={`flex items-center ${isScrolled
              ? 'container justify-between'
              : 'justify-center px-4'
            }`}
        >
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isScrolled ? 'w-12 opacity-100' : 'w-0 opacity-0'
              }`}
          >
            <CreolitosLogoSM className="w-12 h-12" />
          </div>
          <NavLinks />
        </div>
      </div>
    
    </div>
  );
}
