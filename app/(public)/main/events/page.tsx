import { createClient } from '@/utils/supabase/supabaseServer';
import { lusitana } from '@/app/ui/fonts';
import { CalendarIcon, MapPinIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

async function getEvents() {
  try {
    const supabase = await createClient();
    
    // Get future events
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', now)  // Only get events that haven't happened yet
      .order('date', { ascending: true });
      
    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className={`${lusitana.className} text-4xl font-bold mb-2 text-center`}>
        Upcoming Events
      </h1>
      <p className="text-gray-600 text-center mb-10">
        Join us at our upcoming events and activities
      </p>
      
      {events.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">No upcoming events</h2>
          <p className="max-w-md mx-auto">
            We don't have any events scheduled at the moment. 
            Please check back soon or subscribe to our newsletter to get notified when new events are announced.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Event image or placeholder */}
              <div className="h-48 bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                <CalendarIcon className="w-16 h-16 text-white" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                
                {/* Date and Time */}
                <div className="flex items-start mb-4 text-sm">
                  <CalendarIcon className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium">{formatDate(event.date)}</div>
                    <div className="text-gray-600">{formatTime(event.date)}</div>
                  </div>
                </div>
                
                {/* Location if available */}
                {event.location && (
                  <div className="flex items-center mb-4 text-sm">
                    <MapPinIcon className="w-5 h-5 text-amber-600 mr-2" />
                    <span>{event.location}</span>
                  </div>
                )}
                
                {/* Price */}
                <div className="flex items-center mb-4 text-sm">
                  <CurrencyDollarIcon className="w-5 h-5 text-amber-600 mr-2" />
                  <span>
                    {parseFloat(event.price) === 0 
                      ? 'Free' 
                      : `$${parseFloat(event.price).toFixed(2)}`
                    }
                  </span>
                </div>
                
                {/* Capacity if available */}
                {event.capacity && (
                  <div className="flex items-center mb-4 text-sm">
                    <UserGroupIcon className="w-5 h-5 text-amber-600 mr-2" />
                    <span>Limited capacity: {event.capacity} spots</span>
                  </div>
                )}
                
                {/* Description preview if available */}
                {event.description && (
                  <div className="mt-4">
                    <p className="text-gray-600 text-sm">
                      {event.description.length > 120
                        ? `${event.description.substring(0, 120)}...`
                        : event.description}
                    </p>
                  </div>
                )}
                
                {/* Call to action */}
                <div className="mt-6">
                  <a 
                    href="#" // You can replace this with an actual registration link
                    className="block w-full bg-amber-600 text-white text-center py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Call to action section */}
      <div className="mt-16 bg-amber-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Want to stay updated?</h2>
        <p className="mb-6 max-w-lg mx-auto">
          Subscribe to our newsletter to get notified about upcoming events and activities.
        </p>
        <a 
          href="/main/contact" 
          className="inline-block bg-amber-600 text-white py-2 px-6 rounded-md hover:bg-amber-700 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}