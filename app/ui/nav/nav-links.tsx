'use client';

import {
  CalendarIcon,
  HomeIcon,
  PhotoIcon,
  MicrophoneIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import NavButton from './nav-button';

// NavLink type definition
export type NavLink = {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
};

// Array of navigation links
export const navLinks: NavLink[] = [
  {
    name: 'Home',
    description: 'Return to the homepage',
    href: '/',
    icon: HomeIcon
  },
  {
    name: 'Events',
    description: 'View our upcoming events',
    href: '/events',
    icon: CalendarIcon,
  },
  {
    name: 'Gallery',
    description: 'View our photo gallery',
    href: '/gallery',
    icon: PhotoIcon
  },
  {
    name: 'Blog',
    description: 'Read our latest articles',
    href: '/blog',
    icon: MicrophoneIcon
  },
  {
    name: 'Contact',
    description: 'Get in touch with us',
    href: '/contact',
    icon: InboxIcon
  },
];

export default function NavLinks() {
  return (
    <>
      {navLinks.map(({name, icon, href}) => (
        <NavButton
          key={name}
          name={name}
          href={href}
          icon={icon}
        />
      ))}
    </>
  );
}
