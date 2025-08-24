import Link from 'next/link';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function EventsPage() {
  // This is a placeholder for the actual data fetching from your database
  const mockEvents = [
    {
      id: '1',
      title: 'Summer Spanish Immersion Camp',
      description: 'A week-long Spanish language immersion experience for children ages 5-12.',
      date: '2025-07-15T09:00:00.000Z',
      location: 'Central Community Center',
      price: 250,
    },
    {
      id: '2',
      title: 'Caribbean Cooking Workshop',
      description: 'Learn to cook authentic Caribbean dishes in this hands-on workshop.',
      date: '2025-06-22T18:00:00.000Z',
      location: 'Creolitos Cultural Center',
      price: 75,
    },
    {
      id: '3',
      title: 'Latin Dance Night',
      description: 'An evening of salsa, merengue, and bachata with professional instructors.',
      date: '2025-05-30T20:00:00.000Z',
      location: 'Downtown Dance Studio',
      price: 30,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Upcoming Events
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join us for immersive cultural and educational experiences
        </p>
      </div>
      
      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="text-sm text-amber-600 font-semibold mb-2">
                {formatDateToLocal(event.date)}
              </div>
              
              <h2 className="text-xl font-bold mb-2">
                {event.title}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {event.description}
              </p>
              
              <div className="flex items-center text-gray-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{event.location}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-bold text-lg">
                  ${event.price}
                </div>
                
                <Link
                  href={`/main/events/${event.id}`}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}