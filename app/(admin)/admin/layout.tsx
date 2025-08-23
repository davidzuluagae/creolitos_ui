import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { dynaPuff } from '@/app/ui/fonts';
import Link from 'next/link';
import SignOutButton from '@/app/ui/auth/signout-button';

// Layout component for admin pages with authentication
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated and is an admin
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set({ name, value, ...options }),
        remove: (name, options) => cookieStore.set({ name, value: '', ...options }),
      },
    }
  );
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // User is not logged in, redirect to login page
    redirect('/login');
  }
  
  // Here you would check if the user has admin role
  // This is a placeholder for your actual admin check
  // For example:
  // const { data: userData } = await supabase
  //   .from('users')
  //   .select('role')
  //   .eq('id', session.user.id)
  //   .single();
  //
  // if (userData.role !== 'admin') {
  //   redirect('/unauthorized');
  // }

  const userEmail = session.user.email;

  return (
    <div className={`${dynaPuff.className} min-h-screen bg-gray-50`}>
      <div className="bg-amber-800 text-white py-4 px-8 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Creolitos Admin</h1>
          
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4">
              <Link href="/admin" className="hover:underline">Dashboard</Link>
              <Link href="/admin/events" className="hover:underline">Events</Link>
              <Link href="/main" className="hover:underline">View Site</Link>
            </nav>
            
            <div className="ml-6 flex items-center">
              <span className="mr-2 text-sm hidden md:inline-block">
                {userEmail}
              </span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-10">
        {children}
      </div>
    </div>
  );
}