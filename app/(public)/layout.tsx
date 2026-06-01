import Header from '@/app/ui/header/header-sm';
import Footer from '@/app/ui/footer/footer';
// import { createClient } from '@/utils/supabase/supabaseServer';
// import { getUserRoleFromJWT } from '@/utils/supabase/roleUtils';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // We can still fetch the user server-side if needed for SSR
  // const supabase = await createClient();
  // const { data: user } = await supabase.auth.getUser()
  // let role = null;
  // if (user) {
  //   role = await getUserRoleFromJWT(supabase);
  // }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <div className="flex-grow flex-col pt-8 flex items-center">
        <div className="markdown">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
