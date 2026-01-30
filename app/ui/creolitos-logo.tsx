import Link from 'next/link';
import Image from 'next/image';

export interface CreolitosLogoProps {
  className?: string;
  showSubtitle?: boolean;
  height?: number;
}

export function CreolitosLogo({ 
  className, 
  showSubtitle, 
  height = 100 
}: CreolitosLogoProps) {
  const aspectRatio = 2.56;
  const width = height * aspectRatio;

  return (
    <div className={showSubtitle? "flex flex-col align-middle p-0":""}>
      <Image 
        src="/creolitos_logo.png" 
        width={width} 
        height={height} 
        className={className}
        alt="Creolitos"
      />
      {showSubtitle && <h1 className='text-center text-lg py-2'>Multicultural & Multilingual Education</h1>}
    </div>
  );
}

export interface CreolitosLogoSmProps {
  className?: string;
  height?: number;
}

export function CreolitosLogoSM({ 
  className, 
  height = 50 
}: CreolitosLogoSmProps) {
  const aspectRatio = 1;
  const width = height * aspectRatio;

  return (
    <div className="flex flex-col align-middle p-0">
      <Image 
        src="/creolitos_sm.png" 
        width={width} 
        height={height} 
        className={className || "hidden md:block relative z-20"}
        alt="Creolitos"
      />
    </div>
  );
}
