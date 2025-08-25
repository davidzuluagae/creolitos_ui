import { redirect } from 'next/navigation';
import { dynaPuff } from '@/app/ui/fonts';
import Link from 'next/link';
import LogInButton from '@/app/ui/auth/signout-button';
import { createClient } from '@/utils/supabase/supabaseServer';
import { getUserRoleFromJWT } from '@/utils/supabase/roleUtils';

// Layout component for admin pages with authentication
export default async function AdminLayout({children}: {children: React.ReactNode}) {
    const supabase = await createClient();
    const {data: user} = await supabase.auth.getUser()
    if (!user) {
    // User is not logged in, redirect to login page
    redirect('/login');
  }

      const roleData = await getUserRoleFromJWT(supabase);

  const userEmail = user.user?.email || 'No Email';

  return (
    <div className={`${dynaPuff.className} min-h-screen bg-gray-50`}>
      <div className="bg-amber-800 text-white py-4 px-8 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Creolitos Admin</h1>
          
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4">
              <Link href="/admin" className="hover:underline">Dashboard</Link>
              <Link href="/admin/events" className="hover:underline">Events</Link>
              <Link href="/" className="hover:underline">View Site</Link>
            </nav>
            
            <div className="ml-6 flex items-center">
              <span className="mr-2 text-sm hidden md:inline-block">
                {roleData?.role || 'No Role'}:
              </span>
              <span className="mr-2 text-sm hidden md:inline-block">
                {userEmail}
              </span>
              <LogInButton isLoggedIn={!!user.user} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-10">
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-w-full text-sm">
        </pre>
        {children}
      </div>
    </div>
  );
}