'use client';

import Link from 'next/link';
import { CalendarIcon, UsersIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AdminDashboard() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className={`${lusitana.className} text-3xl font-bold mb-8 text-center`}>
        Admin Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Events Management Card */}
        <Link 
          href="/admin/events"
          className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow"
        >
          <div className="bg-amber-100 p-4 rounded-full mb-4">
            <CalendarIcon className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <p className="text-gray-600">Create and manage upcoming events for Creolitos.</p>
        </Link>
        
        {/* Users Management Card (Placeholder for future functionality) */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center opacity-70">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <UsersIcon className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600">Manage user accounts and permissions (Coming soon).</p>
        </div>
        
        {/* Content Management Card (Placeholder for future functionality) */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center opacity-70">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <ClipboardDocumentIcon className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <p className="text-gray-600">Edit website content and blog posts (Coming soon).</p>
        </div>
      </div>
      
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Create events in the Events section with complete details to display them on the website.</li>
          <li>All dates and times are stored in UTC. Make sure to set the correct time for your local timezone.</li>
          <li>Add location details to help attendees find your events easily.</li>
          <li>Set capacity limits if the venue has space restrictions.</li>
          <li>Need help? Contact the website administrator for assistance.</li>
        </ul>
      </div>
    </div>
  );
}