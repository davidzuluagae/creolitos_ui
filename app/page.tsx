import Header from '@/app/ui/header/header-sm';
import Footer from '@/app/ui/footer/footer';
import Home from '@/content/home.mdx';
import BlogPreview from './ui/blog/blog-preview';
import EventsPreview from './ui/events/event-preview';
import Hero from './ui/hero/hero';
import GalleryCarousel from './ui/gallery/carousel';
import {WavyDivider, SlantedDivider, BlobDivider} from '@/app/ui/dividers';

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col bg-creoCont-purple100">
        <Hero />
      </section>

      <BlobDivider color="fill-creoCont-purple100" flip={true}/>
      
      {/* EVENTS PREVIEW */}
      <section id="events" className="py-20 max-w-4xl w-full px-6">
        <EventsPreview />
        <a href="/events" className="block mt-6 text-blue-500 hover:underline">
          View All Events →
        </a>
      </section>
      {/* GALLERY PREVIEW */}
      <section id="gallery" className="py-20 bg-gray-50 w-full px-6">
        <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
        <GalleryCarousel />
        <a href="/gallery" className="block mt-6 text-blue-500 hover:underline">
          See Full Gallery →
        </a>
      </section>

      {/* BLOG PREVIEW */}
      <section id="blog" className="py-20 max-w-4xl w-full px-6">
        <BlogPreview />
        <a href="/blog" className="block mt-6 text-blue-500 hover:underline">
          Read More Posts →
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-gray-50 w-full px-6">
        <div className="prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
          <Home />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 max-w-2xl w-full px-6">
        <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-2 border rounded-lg" />
          <input type="email" placeholder="Your Email" className="p-2 border rounded-lg" />
          <textarea placeholder="Message" className="p-2 border rounded-lg" rows={4} />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Send
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <section id="footer" className="flex-grow flex-col pt-8 flex items-center">
        <Footer />
      </section>
    </main>
  );
}
