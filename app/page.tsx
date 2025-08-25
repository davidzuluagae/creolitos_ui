import Header from '@/app/ui/header/header';
import Footer from '@/app/ui/footer/footer';
import Home from '@/content/home.mdx';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex-col pt-8 flex items-center">
        <div className="prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
          <Home />
        </div>
        <Footer />
      </div>
    </div>
  );
}
