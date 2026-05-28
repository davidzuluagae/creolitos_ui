import { dynaPuff } from '@/app/ui/fonts';
import Link from 'next/link';
import {CreolitosLogoSM} from '@/app/ui/creolitos-logo';

export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <div className={`${dynaPuff.className} min-h-screen bg-gray-50`}>
      <div className="bg-creoPri-200 py-4 px-8 mb-6 shadow">
        <div className="container mx-auto flex justify-between items-center">
<div className='flex items-center space-x-4'>
        <Link href="/">
          <CreolitosLogoSM />
        </Link>
          <h1 className="font-bold text-white">
            Creolitos Admin
            </h1>
           </div> 
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-8 text-xl text-white">
              <Link href="/admin" className="hover:underline">Dashboard</Link>
              <Link href="/" className="hover:underline">View Site</Link>
            </nav>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-10">
        {children}
      </div>
    </div>
  );
}
