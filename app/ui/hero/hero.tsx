
import CreolitosLogo from '@/app/ui/creolitos-logo';
import Link from 'next/link';

export default function Hero() {

    return (
        /* Container with background */
        <div className="flex flex-col justify-center items-stretch px-4 py-3 md:py-2 bg-[url('/stock_bg.png')] bg-repeat">
            {/* Gradient overlays for fading border */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

            <h1 className="text-4xl font-bold mb-4">Bienvenidos</h1>
            
        <Link
          className="flex flex-row mb-2 rounded-md p-4 justify-center relative z-10"
          href="/"
        >
          <CreolitosLogo />
        </Link>
            <a href="#events" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                See Upcoming Events
            </a>
        </div>
    );
}