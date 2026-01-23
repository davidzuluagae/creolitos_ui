
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LinkIcon } from '@heroicons/react/24/outline';
import { Button } from '@headlessui/react'


interface NavButtonProps {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}


export default function NavButton({ name, href, icon: Icon }: NavButtonProps) {
  const pathname = usePathname();
  console.log('Current pathname:', pathname);
  const renderIcon = Icon && <Icon
    className={clsx(
      "w-5 h-5 transition-colors",
      pathname === href ? "text-creoCont-creoSkin-200" : "text-creoSkin-200"
    )}
  />
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-2 hover:rounded-full px-4 py-2 text-base font-medium transition-all duration-200",
        "hover:bg-creoSkin-300 hover:shadow-sm",
        pathname === href
          ? "bg-creoCont-purple shadow-md":""
      )}
    >
      {renderIcon}
      <span className="hidden md:inline tracking-wide">{name}</span>
    </Link>
  );
}