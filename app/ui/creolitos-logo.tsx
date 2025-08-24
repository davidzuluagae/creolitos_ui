import Link from 'next/link';
import Image from 'next/image';

export default function CreolitosLogo() {
  return (
    <div className="relative overflow-visible rounded-lg px-8">
      {/* Elliptical gradient background with extended width */}
      <div 
        className="absolute -left-8 -right-8 top-0 -bottom-4 z-0" 
        style={{ 
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0) 100%)',
        }}
      ></div>
      
      {/* Logo image */}
      <Image 
        src="/creolitos_logo.png" 
        width={512} 
        height={200} 
        className="hidden md:block relative z-20" 
        alt="Creolitos"
      />
    </div>
  );
}
