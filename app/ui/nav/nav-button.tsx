
'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface NavButtonProps {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  bgColor?: string;
  mobile?: boolean;
  onClick?: () => void;
}

const hoverBgColors: Record<string, string> = {
  pink: 'hover:bg-creoCont-pink',
  purple: 'hover:bg-creoCont-purple',
  mint: 'hover:bg-creoCont-mint',
  yellow: 'hover:bg-creoCont-yellow',
  blue: 'hover:bg-creoCont-blue',
}

export default function NavButton({ name, href, icon: Icon, bgColor, mobile, onClick }: NavButtonProps) {
  const pathname = usePathname();
  const hoverBgClass = bgColor ? hoverBgColors[bgColor] : 'hover:bg-creoSkin-300';
  const renderIcon = Icon && <Icon
    className={clsx(
      "w-5 h-5 transition-colors",
      pathname === href ? "text-creoCont-creoSkin-200" : "text-creoSkin-200"
    )}
  />
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 rounded-2xl transition-all duration-200",
        mobile
          ? "w-full justify-between px-4 py-3 text-lg font-semibold"
          : "px-4 py-2 text-xl font-medium",
        hoverBgClass,
        "hover:text-creoSkin-100",
        "hover:shadow-sm",
        pathname === href && href !== '/'
          ? "bg-creoCont-purple shadow-md" : ""
      )}
    >
      {renderIcon}
      <span className={clsx("tracking-wide", mobile ? "flex-1" : "hidden lg:inline")}>{name}</span>
    </Link>
  );
}
