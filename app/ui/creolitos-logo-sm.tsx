import Link from 'next/link';
import Image from 'next/image';

export default function CreolitosLogo() {
  return (
    <div className="relative overflow-visible rounded-lg px-8">
    
      <Image 
        src="/creolitos_sm.png" 
        width={80} 
        height={80} 
        style={{ height: 'auto' }} 
        className="hidden md:block relative z-20" 
        alt="Creolitos"
      />
    </div>
  );
}
