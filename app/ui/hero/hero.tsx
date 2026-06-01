'use client';

import { useEffect, useRef, useState } from 'react';
import RotatingWelcome from '../rotatingMsg';
import {SolidWavyDivider} from '@/app/ui/dividers';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const posterSrc = '/hero-poster.jpg';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateViewportState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateViewportState();
    mediaQuery.addEventListener('change', updateViewportState);

    return () => mediaQuery.removeEventListener('change', updateViewportState);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    setIsVideoReady(false);
    video.load();
    video.play().catch(() => {
      // Mobile browsers can still require a gesture; the poster remains visible.
    });
  }, [isMobile]);

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden bg-creoCont-neutral1 md:min-h-[7/8-screen]">
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center md:object-top"
      />
      <video
        ref={videoRef}
        key={isMobile ? 'mobile' : 'desktop'}
        className={`absolute inset-0 h-full w-full object-cover object-center md:object-top transition-opacity duration-300 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        onCanPlay={() => setIsVideoReady(true)}
      >
        <source
          src={isMobile ? '/hero-portrait.mp4' : '/hero-landscape.mp4'}
          type="video/mp4"
        />
      </video>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-[#704214]/10"></div>

      <div className="absolute bottom-0 left-0 h-24 w-full">
        <SolidWavyDivider
          color="fill-creoCont-pink"
        />
      </div>

      {/* <!-- Content --> */}
      <div className="relative z-10 flex h-full items-center pt-28 md:pt-32 lg:pt-40">
        <div className="container mx-auto px-6">
          <RotatingWelcome />

          {/* <p className="mt-4 text-creoCont-neutral1 justify-center text-xl">
            Raising Confident Multilingual Children One Story at a Time
          </p> */}
        </div>
      </div>
    </section>
  );
}
