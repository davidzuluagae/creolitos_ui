'use client';

import Link from 'next/link';
import Image from 'next/image';
import Social from "./social";
import { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

export default function Footer() {
    const facebookUser = "creolitos";
    const instagramUser = "creolitos";
    const youtubeUser = "@creolitos_EDU";
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send this to your API/backend
        console.log('Subscribed:', email);
        setSubscribed(true);
        setEmail('');
    };

    const scrollToTop = () => {
        const contentDiv = document.querySelector('.flex-grow.overflow-auto');
        if (contentDiv) {
            contentDiv.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="relative bg-amber-700 text-white py-8 px-4 md:px-8 shadow-md w-full">
            {/* Background image overlay with high transparency */}
            <div className="absolute inset-0 bg-[url('/stock_bg.png')] bg-repeat opacity-15 pointer-events-none"></div>
            
            {/* Gradient overlay just for the top border */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
            
            {/* Back to top button */}
            <div className="flex justify-center mb-6 relative z-10">
                <button 
                    onClick={scrollToTop}
                    className="flex items-center justify-center bg-amber-800 hover:bg-amber-900 text-white rounded-full p-3 transition-all"
                    aria-label="Back to top"
                >
                    <ChevronUpIcon className="w-6 h-6" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Company Info with logo aligned vertically with the text */}
                <div className="flex flex-row gap-4">
                    <div className="flex items-center justify-center">
                        <Image 
                            src="/creolitos_sm.png" 
                            alt="Creolitos Logo" 
                            width={100} 
                            height={100} 
                            className="rounded-md object-contain self-center"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-bold mb-2">Creolitos ltd.™</p>
                        <p>Maria A. Lasso</p>
                        <p>Founder</p>
                        <p>© {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                </div>
                
                {/* Quick Links / Sitemap */}
                <div className="flex flex-col">
                    <h3 className="font-bold mb-4">Sitemap</h3>
                    <nav className="flex flex-col space-y-2">
                        <Link href="/main" className="hover:underline">Home</Link>
                        <Link href="/main/blog" className="hover:underline">Blog</Link>
                        <Link href="/main/events" className="hover:underline">Events</Link>
                        <Link href="/main/gallery" className="hover:underline">Gallery</Link>
                        <Link href="/main/contact" className="hover:underline">Contact</Link>
                    </nav>
                </div>
                
                {/* Subscribe & Social */}
                <div className="flex flex-col">
                    <h3 className="font-bold mb-4">Stay Connected</h3>
                    
                    {/* Email Subscription */}
                    <div className="mb-6">
                        {!subscribed ? (
                            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                                <label htmlFor="email" className="text-sm">Subscribe to our newsletter</label>
                                <div className="flex">
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email"
                                        required
                                        className="px-4 py-2 rounded-l text-black focus:outline-none flex-1"
                                    />
                                    <button 
                                        type="submit" 
                                        className="bg-amber-900 hover:bg-amber-950 px-4 py-2 rounded-r"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <p className="text-green-300">Thanks for subscribing!</p>
                        )}
                    </div>
                    
                    {/* Social Media Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold">Follow Us</h3>
                        <div className="flex flex-wrap gap-6">
                            <Social 
                                platform="facebook" 
                                username={facebookUser} 
                                className="flex flex-col items-center hover:scale-110 transition-all" 
                                size={28}
                            />
                            <Social 
                                platform="instagram" 
                                username={instagramUser}
                                className="flex flex-col items-center hover:scale-110 transition-all" 
                                size={28}
                            />
                            <Social 
                                platform="youtube" 
                                username={youtubeUser}
                                className="flex flex-col items-center hover:scale-110 transition-all" 
                                size={28}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
