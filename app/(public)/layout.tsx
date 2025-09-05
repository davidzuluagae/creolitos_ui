import Header from '@/app/ui/header/header-sm';
import Footer from '@/app/ui/footer/footer';
import { createClient } from '@/utils/supabase/supabaseServer';
import { getUserRoleFromJWT } from '@/utils/supabase/roleUtils';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // We can still fetch the user server-side if needed for SSR
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser()
  let role = null;
  if (user) {
    role = await getUserRoleFromJWT(supabase);
  }
  
  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex-grow flex-col pt-8 flex items-center">
        <div className="prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}