
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
  Icon = Icon || LinkIcon;
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-2 rounded-full px-4 text-base font-medium transition-all duration-200",
        "hover:bg-creoSec-100 hover:shadow-sm",
        pathname === href
          ? "bg-creoPri-200 text-white shadow-md"
          : "bg-creoCont-neutral1 text-creoLim-200"
      )}
    >
      <Icon
        className={clsx(
          "w-5 h-5 transition-colors",
          pathname === href ? "text-white" : "text-creoLim-200"
        )}
      />
      <span className="hidden md:inline tracking-wide">{name}</span>
    </Link>
  );
}