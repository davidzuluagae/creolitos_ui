import Header from '@/app/ui/header/header-sm';
import Footer from '@/app/ui/footer/footer';
import Who from '@/content/who';
import Offer from '@/content/offer.mdx';
import How from '@/content/how.mdx';
import BlogPreview from './ui/blog/blog-preview';
import EventsPreview from './ui/events/admin/eventsPreview';
import Hero from './ui/hero/hero';
import GalleryCarousel from './ui/gallery/carousel';
import {WavyDivider, BlobDivider} from '@/app/ui/dividers';

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen bg-creoCont-neutral1 text-creoSkin-100">
      <Header />
      {/* <BlobDivider
                colorBottom="fill-none"
                color='fill-creoCont-neutral1'
                flipped={true}
              /> */}
      {/* HERO */}
      <section id="hero" className=" min-h-[75vh] flex flex-col bg-creoCont-neutral1">
        <Hero />
      </section>

      {/* who we are */}
      <section id="who_we_are" className="w-full bg-creoCont-neutral1">
        <div id='Who_header' className='w-full bg-creoCont-pink'>
          <h1 className="container text-5xl font-semibold text-creoSkin-100 pt-4">What is Creolitos</h1>
        </div>
      <BlobDivider
                colorBottom="fill-creoCont-pink"
                color='fill-creoCont-neutral1'
                flipped={true}
              />
          <Who />
      </section>
      
      <BlobDivider 
        color="fill-creoCont-neutral1" 
        colorBottom="fill-creoCont-purple" 
      />
      {/* services */}
      <section id="services" className="w-full bg-creoCont-neutral1">
        <div id='contact_header' className='w-full bg-creoCont-purple'>
          <h1 className="container text-5xl font-semibold text-creoSkin-100 pt-4">What we offer</h1>
        </div>
      <BlobDivider
                colorBottom="fill-creoCont-purple"
                color='fill-creoCont-neutral1'
                flipped={true}
              />
        <div className="container prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
          <Offer />
        </div>
      </section>
      
      <BlobDivider 
        color="fill-creoCont-yellow" 
        colorBottom="fill-creoCont-neutral1" 
        flipped={true}
      />
      
      {/* how */}
      <section id="how" className="w-full bg-creoCont-neutral1">
        <div id='contact_header' className='w-full bg-creoCont-yellow'>
          <h1 className="container text-5xl font-semibold text-creoSkin-100 pt-4">How we Work</h1>
        </div>
      <BlobDivider
                colorBottom="fill-creoCont-neutral1"
                color='fill-creoCont-yellow'
              />
        <div className="container prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
          <How />
        </div>
      </section>

      {/* FOOTER */}
      <section id="footer">
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