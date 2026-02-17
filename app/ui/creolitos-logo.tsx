import Image from 'next/image';
import clsx from 'clsx';
import logo from '@/public/creolitos_logo.png';

export interface CreolitosLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function CreolitosLogo({ 
  className, 
  showSubtitle 
}: CreolitosLogoProps) {
  return (
    <div className={clsx(showSubtitle && "flex flex-col items-center p-0")}>
      <Image 
        src={logo} 
        className={clsx("h-24 w-auto", className)}
        alt="Creolitos"
      />
      {showSubtitle && (
        <h1 className="text-center text-lg py-2">
          Multicultural & Multilingual Education
        </h1>
      )}
    </div>
  );
}

export interface CreolitosLogoSmProps {
  className?: string;
}

export function CreolitosLogoSM({ 
  className 
}: CreolitosLogoSmProps) {
  return (
    <div className="flex flex-col align-middle p-0">
      <img
        src="/creolitos_sm.svg"
        className={clsx("hidden md:block h-12 w-auto", className)}
        alt="Creolitos"
      />
    </div>
  );
}
