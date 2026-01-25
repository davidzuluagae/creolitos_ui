import RotatingWelcome from '../rotatingMsg';
import {SolidWavyDivider} from '@/app/ui/dividers';

export default function Hero() {
  return (
<section className="relative w-full min-h-[78vh] md:min-h-[7/8-screen] overflow-hidden">
<video
      className="absolute inset-0 w-full h-full object-cover object-top"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/images/hero-poster.jpg"
    >
      {/* Landscape */}
      <source
        src="/hero-landscape1.webm"
        type="video/webm"
        media="(orientation: landscape)"
      />
      <source
        src="/hero-landscape.mp4"
        type="video/mp4"
        media="(orientation: landscape)"
        />

      {/* Portrait */}
      <source
        src="/hero-portrait.webm"
        type="video/webm"
        media="(orientation: portrait)"
      />
      <source
        src="/hero-portrait.mp4"
        type="video/mp4"
        media="(orientation: portrait)"
      />
    </video>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-[#704214]/10"></div>

  <div className="absolute bottom-0 left-0 w-full h-24">
        <SolidWavyDivider
          color="fill-creoCont-pink"
        />
  </div>

      {/* <!-- Content --> */}
      <div className="relative z-10 h-full flex items-center ">
        <div className="container mx-auto px-6">
          <RotatingWelcome />

          {/* <p className="mt-4 text-creoCont-neutral1 justify-center text-xl">
            Raising Confident Multilingual Children One Story at a Time
          </p> */}
        </div>
      </div>
    </section>
  )
}