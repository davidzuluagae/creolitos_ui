'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/nav/nav-links';
import { CreolitosLogo, CreolitosLogoSM } from '@/app/ui/creolitos-logo';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 110);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${isScrolled
          ? 'bg-creoCont-neutral1 shadow-md'
          : 'backdrop-blur-md bg-white/20 border-b border-white/30'}
      `}
    >
      <div
        className={`
          container mx-auto
          flex items-center justify-between
          transition-all duration-300
          ${isScrolled ? 'h-16 px-4' : 'h-36 px-6'}
        `}
      >
        <Link href="/" className="flex items-center">
          {isScrolled ? (
            <CreolitosLogoSM className="h-10 w-auto" />
          ) : (
            <CreolitosLogo className="h-28 w-auto" />
          )}
        </Link>

        <NavLinks className={isScrolled ? 'text-creoSkin-300' : 'text-creoSkin-400'}/>
      </div>
    </header>
  );
}
