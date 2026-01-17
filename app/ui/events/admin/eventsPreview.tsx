
import { mockEvents } from '@/app/(public)/events/page';
import { formatDateToLocal } from '@/app/lib/utils';
import Link from 'next/link';

export default function EventsPreview() {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    href={`/events/${event.id}`}
                                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}