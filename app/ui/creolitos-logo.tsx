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
    <div className={clsx("flex shrink-0 items-center", showSubtitle && "flex-col items-center p-0")}>
      <Image 
        src={logo} 
        className={clsx("h-24 w-auto shrink-0 object-contain", className)}
        alt="Creolitos"
        priority
        sizes="(max-width: 768px) 160px, 192px"
      />
      {showSubtitle && (
        <h1 className="text-center py-2">
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
    <div className="flex shrink-0 flex-col align-middle p-0">
      <img
        src="/creolitos_sm.svg"
        className={clsx("h-12 w-auto shrink-0 object-contain", className)}
        alt="Creolitos"
      />
    </div>
  );
}
