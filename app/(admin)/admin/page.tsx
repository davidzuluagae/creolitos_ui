'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-creoLim-200">
        Admin Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Management Card (Disabled) */}
        <div
          className="block bg-creoCont-bright1/60 rounded-lg shadow-md overflow-hidden opacity-60 cursor-not-allowed"
          aria-disabled="true"
        >
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-xl font-semibold text-creoPri-200 mb-2">Event Management</h2>
            <p className=" mb-4">Disabled (migrating to Eventbrite)</p>
            <div className="mt-auto">
              <span className="inline-flex items-center text-sm font-medium text-creoLim-100">
                Events disabled
                <ArrowPathIcon className="ml-2 h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
        
        {/* Blog Management Card */}
        <Link 
          href="/admin/blog"
          className="block bg-creoCont-bright2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-xl font-semibold text-creoPri-200 mb-2">Blog Management</h2>
            <p className=" mb-4">Write, edit, and publish blog posts</p>
            <div className="mt-auto">
              <span className="inline-flex items-center text-sm font-medium text-creoLim-100">
                Manage blog
                <ArrowPathIcon className="ml-2 h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
