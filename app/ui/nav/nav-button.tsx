
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LinkIcon } from '@heroicons/react/24/outline';

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
      className={
        clsx('flex grow justify-center items-center gap-2 rounded-2xl bg-orange-100 border-2 border-black p-3 text-lg font-medium hover:bg-yellow-950 hover:text-yellow-50 md:justify-start md:p-2 md:px-3',
          {
            'bg-yellow-900 text-yellow-50': pathname === href,
          },
        )
      }

    >
      <Icon className="w-8" />
      <p className="hidden md:block">{name}</p>
    </Link>
  );
}