import Header from '@/app/ui/header/header-sm';
import Footer from '@/app/ui/footer/footer';
import WhatIs from '@/content/what_is.mdx';
import Offer from '@/content/offer.mdx';
import How from '@/content/how.mdx';
import BlogPreview from './ui/blog/blog-preview';
import EventsPreview from './ui/events/admin/eventsPreview';
import Hero from './ui/hero/hero';
import GalleryCarousel from './ui/gallery/carousel';
import {WavyDivider, BlobDivider, StickFigureDivider} from '@/app/ui/dividers';

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      {/* HERO */}
      <section id="hero" className=" min-h-[75vh] flex flex-col bg-creoCont-neutral1">
        <Hero />
      </section>

      <BlobDivider 
        color="fill-creoCont-neutral1" 
        colorBottom="fill-creoCont-pink" 
      />

      {/* what is */}
      <section id="what_is" className="py-20 bg-creoCont-pink w-full px-6">
        <div className="container prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
          <WhatIs />
        </div>
      </section>
      
      <WavyDivider 
        color="fill-creoCont-pink" 
        colorBottom="fill-creoCont-yellow" 
      />

      {/* services */}
      <section id="services" className="py-20 bg-creoCont-yellow w-full px-6">
        <div className="container prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
          <Offer />
        </div>
      </section>
      
      <BlobDivider 
        color="fill-creoCont-yellow" 
        colorBottom="fill-creoCont-purple" 
      />
      
      {/* how */}
      <section id="how" className="py-20 bg-creoCont-purple w-full px-6">
        <div className="container prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
          <How />
        </div>
      </section>

      <StickFigureDivider/>
      
      {/* CONTACT */}
      <section id="contact" className="py-20 bg-creoCont-mint w-full px-6">
        <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
        <form className="flex gap-4 ">
          <div className='flex flex-col'>
          <input type="text" placeholder="Your Name" className="p-2 border rounded-lg" />
          <input type="email" placeholder="Your Email" className="p-2 border rounded-lg" />
          </div>
          <div className='flex-4 flex-col'>
          <textarea placeholder="Message" className="p-2 border rounded-lg" rows={4} />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Send
          </button>
          </div>
        </form>
        </div>
      </section>

      {/* FOOTER */}
      <section id="footer" className="flex-grow flex-col pt-8 flex items-center">
        <Footer />
      </section>
    </main>
  );
}
      
      {/* EVENTS PREVIEW */}
      {/* <section id="events" className="py-20 max-w-4xl w-full px-6">
        <EventsPreview />
        <a href="/events" className="block mt-6 text-blue-500 hover:underline">
          View All Events →
        </a>
      </section> */}

      {/* GALLERY PREVIEW */}
      {/* <section id="gallery" className="py-20 bg-gray-50 w-full px-6">
        <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
        <GalleryCarousel />
        <a href="/gallery" className="block mt-6 text-blue-500 hover:underline">
          See Full Gallery →
        </a>
      </section> */}

      {/* BLOG PREVIEW */}
      {/* <section id="blog" className="py-20 max-w-4xl w-full px-6">
        <BlogPreview />
        <a href="/blog" className="block mt-6 text-blue-500 hover:underline">
          Read More Posts →
        </a>
      </section> */}