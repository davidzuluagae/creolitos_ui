'use client';

import {
  CalendarIcon,
  PhotoIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';
import NavButton from './nav-button';

// NavLink type definition
export type NavLink = {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  description?: string;
  disabled?: boolean;
};

// Array of navigation links
export const navLinks: NavLink[] = [
  {
    name: 'Home',
    description: 'Return to the homepage',
    href: '/',
  },
  {
    name: 'About',
    description: 'Our Purpose, Our People',
    href: '#about',
    color: 'pink',
  },
  {
    name: 'Services',
    description: 'Explore our educational experiences',
    href: '#services',
    color: 'purple'
  },
  {
    name: 'Methodology',
    description: 'Learn about the Creolitos approach',
    href: '#how',
    color: 'yellow',
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
    color: 'mint',
  },
];

export interface NavLinksProps {
  className?: string;
  mobile?: boolean;
  onItemClick?: () => void;
}

export default function NavLinks({ className, mobile, onItemClick }: NavLinksProps) {
  return (
    <div
      className={mobile
        ? `flex flex-col gap-2 ${className ?? ''}`
        : `flex flex-row items-center justify-center gap-2 ${className ?? ''}`
      }
    >
      {navLinks
        .filter(({ disabled }) => !disabled)
        .map(({ name, icon, href, color }) => (
          <NavButton
            key={name}
            name={name}
            href={href}
            icon={icon}
            bgColor={color}
            mobile={mobile}
            onClick={onItemClick}
          />
        ))}
    </div>
  );
}
