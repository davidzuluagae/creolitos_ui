import Header from '@/app/ui/header/header-sm';
import Footer from '@/app/ui/footer/footer';
import About from '@/content/about';
import ServicesFamilies from '@/content/services_families';
import Hero from './ui/hero/hero';
import { WavyDivider, BlobDivider } from '@/app/ui/dividers';
import Social from './ui/footer/social';
import ServicesInstitutions from '@/content/services_institutions';
import Methodology from '@/content/methodology';
import MaskedImage from './ui/masked-image';
import ContactForm from './ui/contact/contact-form';


export default function Page() {
  const facebookUser = 'creolitos';
  const instagramUser = 'creolitos';
  const youtubeUser = '@creolitos_EDU';
  const socialIconClass = 'transition-transform hover:scale-110';

  return (
    <main className="flex min-h-screen flex-col bg-creoCont-neutral1 text-creoSkin-100">
      <Header />
      <section id="hero" className="flex min-h-[75vh] flex-col bg-creoCont-neutral1">
        <Hero />
      </section>

      <section id="about" className="scroll-mt-28 w-full bg-creoCont-neutral1">
        <div id="about_header" className="w-full bg-creoCont-pink">
          <h1 className="container text-creoSkin-100 pt-4">Our Purpose, Our People</h1>
        </div>
        <BlobDivider
          colorBottom="fill-creoCont-pink"
          color="fill-creoCont-neutral1"
          flipped={true}
        />
        <About />
      </section>

      <BlobDivider
        color="fill-creoCont-neutral1"
        colorBottom="fill-creoCont-purple"
      />
      <section id="services" className="scroll-mt-28 w-full bg-creoCont-neutral1">
        <div id="services_header" className="w-full bg-creoCont-purple">
          <h1 className="container text-creoSkin-100 pt-4">Our Educational Experiences</h1>
        </div>
        <BlobDivider
          colorBottom="fill-creoCont-purple"
          color="fill-creoCont-neutral1"
          flipped={true}
        />
        <div className="container w-full">
          <ServicesFamilies />
          <ServicesInstitutions />
        </div>
      </section>

      <BlobDivider
        color="fill-creoCont-yellow"
        colorBottom="fill-creoCont-neutral1"
        flipped={true}
      />

      <section id="how" className="scroll-mt-28 w-full bg-creoCont-neutral1">
        <div id="how_header" className="w-full bg-creoCont-yellow">
          <h1 className="container text-creoSkin-100 pt-4">The Creolitos Approach</h1>
        </div>
        <BlobDivider
          colorBottom="fill-creoCont-neutral1"
          color="fill-creoCont-yellow"
        />
        <div className="container">
          <Methodology />
        </div>
      </section>

      <BlobDivider
        color="fill-creoCont-mint"
        colorBottom="fill-creoCont-neutral1"
        flipped={true}
      />

      <section id="contact" className="relative w-full scroll-mt-28 bg-creoCont-mint">
        <div className="relative z-10">
          <div id="contact_header" className="w-full bg-creoCont-mint">
            <h1 className="container text-creoSkin-100 pt-4">Contact Us</h1>
          </div>
          <div className="container flex flex-col items-center gap-8 p-6 lg:flex-row lg:justify-evenly">
            <div className="flex w-full max-w-md flex-col justify-evenly gap-4 px-6 text-center lg:grow-[2]">
              <ContactForm />
              <div id="follow_us" className="my-2 flex flex-col items-center">
                <h3 className="my-2 flex font-bold">Follow Us</h3>
                <div className="flex flex-row gap-10">
                  <Social
                    platform="facebook"
                    username={facebookUser}
                    className={socialIconClass}
                    size={50}
                  />
                  <Social
                    platform="instagram"
                    username={instagramUser}
                    className={socialIconClass}
                    size={50}
                  />
                  <Social
                    platform="youtube"
                    username={youtubeUser}
                    className={socialIconClass}
                    size={50}
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md lg:max-w-xl lg:flex-none">
              <MaskedImage
                className="w-full"
                src="/contact_enh_img.jpg"
                mask="blob-2"
                alt="Contact Ms. Maria"
              />
            </div>
          </div>
          <WavyDivider colorBottom="fill-creoCont-blue" />
        </div>
      </section>

      <section id="footer">
        <Footer />
      </section>
    </main>
  );
}
