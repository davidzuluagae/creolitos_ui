import Link from 'next/link';
import Image from 'next/image';

export interface CreolitosLogoProps {
  className?: string;
  showSubtitle?: boolean;
  width?: number;
  height?: number;
}

export function CreolitosLogo({ 
  className, 
  showSubtitle, 
  width = 512, 
  height = 200 
}: CreolitosLogoProps) {
  return (
    <div className="flex flex-col align-middle p-0">
      <Image 
        src="/creolitos_logo.png" 
        width={width} 
        height={height} 
        style={{ height: 'auto' }} 
        className={className}
        alt="Creolitos"
      />
      {showSubtitle && <h1 className='text-center text-lg py-2'>Multicultural & Multilingual Education</h1>}
    </div>
  );
}

export interface CreolitosLogoSmProps {
  className?: string;
  width?: number;
  height?: number;
}

export function CreolitosLogoSM({ 
  className, 
  width = 50, 
  height = 50 
}: CreolitosLogoSmProps) {
  return (
    <div className="flex flex-col align-middle p-0">
      <Image 
        src="/creolitos_sm.png" 
        width={width} 
        height={height} 
        style={{ height: 'auto' }} 
        className={className || "hidden md:block relative z-20"}
        alt="Creolitos"
      />
    </div>
  );
}
