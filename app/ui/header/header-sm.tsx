'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/nav/nav-links';
import { CreolitosLogo, CreolitosLogoSM } from '@/app/ui/creolitos-logo';
import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileTopOffset, setMobileTopOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 110);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) {
      setMobileTopOffset(0);
      return;
    }

    const updateViewportOffset = () => {
      setMobileTopOffset(window.visualViewport?.offsetTop ?? 0);
    };

    updateViewportOffset();
    window.visualViewport?.addEventListener('resize', updateViewportOffset);
    window.visualViewport?.addEventListener('scroll', updateViewportOffset);

    return () => {
      window.visualViewport?.removeEventListener('resize', updateViewportOffset);
      window.visualViewport?.removeEventListener('scroll', updateViewportOffset);
    };
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 z-50 w-full
        transition-all duration-300
        ${isScrolled
          ? 'bg-creoCont-neutral1 shadow-md border-b border-black/5'
          : 'bg-white/80 border-b border-white/40 md:bg-white/20 md:backdrop-blur-md md:border-white/30'}
        `}
      style={{ top: mobileTopOffset ? `${mobileTopOffset}px` : undefined }}
    >
        <div
          className={`
          container mx-auto
          flex items-center justify-between gap-3
          transition-all duration-300
          ${isScrolled ? 'py-3 md:py-4' : 'py-3 md:py-4 lg:py-5'}
        `}
      >
        <Link href="/" className="flex items-center shrink-0">
          {isScrolled ? (
            <CreolitosLogoSM className="h-10 w-auto md:h-12" />
          ) : (
            <CreolitosLogo className="h-[4.3rem] w-auto md:h-20 lg:h-24" />
          )}
        </Link>

        <NavLinks
          className={isScrolled ? 'hidden lg:flex text-creoSkin-100' : 'hidden lg:flex text-creoSkin-400'}
        />

        <button
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={`
            lg:hidden inline-flex items-center justify-center rounded-2xl border px-3 py-3 mr-2
            transition-all duration-200 shadow-sm
            ${isScrolled
              ? 'border-creoSkin-300 bg-creoCont-neutral1 text-creoSkin-100'
              : 'border-white/50 bg-white/70 text-creoSkin-100 backdrop-blur-md'}
          `}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`
          lg:hidden overflow-hidden border-t border-black/5 bg-creoCont-neutral1 backdrop-blur-md
          transition-[max-height,opacity] duration-300 ease-out
          ${isMenuOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="container mx-auto py-4">
          <NavLinks
            mobile
            onItemClick={() => setIsMenuOpen(false)}
            className="text-creoSkin-100"
          />
        </div>
      </div>
    </header>
  );
}
