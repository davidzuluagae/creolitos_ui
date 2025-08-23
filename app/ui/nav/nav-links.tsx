'use client';

import {
  CalendarIcon,
  HomeIcon,
  PhotoIcon,
  MicrophoneIcon,
  InboxIcon
} from '@heroicons/react/24/outline';
import NavButton from './nav-button';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Home',
    href: '/main',
    icon: HomeIcon
  },
  {
    name: 'Events',
    href: '/main/events',
    icon: CalendarIcon,
  },
  {
    name: 'Gallery',
    href: '/main/gallery',
    icon: PhotoIcon
  },
  {
    name: 'Blog',
    href: '/main/blog',
    icon: MicrophoneIcon
  },
  {
    name: 'Contact',
    href: '/main/contact',
    icon: InboxIcon
  }
];

export default function NavLinks() {
  return (
    <>
      {links.map(({name, icon, href}) => (
        <NavButton key={name} name={name} href={href} icon={icon}/>
      ))}
    </>
  );
}
