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
  disabled?: boolean;
};

// Array of navigation links
export const navLinks: NavLink[] = [
  {
    name: 'Home',
    description: 'Return to the homepage',
    href: '',
  },
  {
    name: 'Who We Are',
    description: 'Return to the homepage',
    href: '#who_we_are',
  },
  {
    name: 'Services',
    description: 'Return to the homepage',
    href: '#services',
  },
  {
    name: 'How we do it',
    description: 'Return to the homepage',
    href: '#how',
  },
  {
    name: 'Events',
    description: 'View our upcoming events',
    href: '#events',
    icon: CalendarIcon,
    disabled: true,
  },
  {
    name: 'Gallery',
    description: 'View our photo gallery',
    href: '#gallery',
    icon: PhotoIcon,
    disabled: true,
  },
  {
    name: 'Blog',
    description: 'Read our latest articles',
    href: '#blog',
    icon: MicrophoneIcon,
    disabled: true,
  },
  {
    name: 'Contact',
    description: 'Get in touch with us',
    href: '#contact',
  },
];

export interface NavLinksProps {
  className?: string;
}

export default function NavLinks({ className }: NavLinksProps) {
  return (
    <div className={`flex flex-row items-center justify-center ${className}`}>
      {navLinks
        .filter(({ disabled }) => { return disabled === null || !disabled })
        .map(({ name, icon, href }) => (
          <NavButton
            key={name}
            name={name}
            href={href}
            icon={icon}
          />
        ))}
    </div>
  );
}
