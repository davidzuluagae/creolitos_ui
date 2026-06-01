'use client';

import { ChevronUpIcon } from '@heroicons/react/24/solid';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative w-full bg-creoCont-blue pb-8">
            <div className="flex justify-center relative z-10">
                <button
                    onClick={scrollToTop}
                    className="flex items-center justify-center bg-creoCont-purple hover:bg-creoCont-pink text-creoCont-blue rounded-full p-3 transition-all"
                    aria-label="Back to top"
                >
                    <ChevronUpIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="container flex flex-col items-center gap-6 text-center md:flex-row md:items-stretch md:justify-between md:text-left">
                <div className="mt-4 flex flex-col items-center gap-4 md:mt-0 md:flex-row md:items-center">
                    <img
                        src="/creolitos_sm.svg"
                        alt="Creolitos Logo"
                        className="h-[100px] w-[100px] rounded-md object-contain"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="mb-2 text-2xl font-bold md:text-3xl">Creolitos ltd.™</p>
                        <p>Maria A. Lasso</p>
                        <p>Founder</p>
                        <p>© {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
