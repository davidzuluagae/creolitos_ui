'use client';

import { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon, UserGroupIcon, TagIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { createEvent, fetchEvents } from './actions';

export default function AdminEventsPage() {
  // Event Series fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('0');
  const [capacity, setCapacity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [eventType, setEventType] = useState('');
  const [host, setHost] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [isSingleEvent, setIsSingleEvent] = useState(true);
  
  // Event Occurrence fields
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [occurrenceDescription, setOccurrenceDescription] = useState('');
  const [occurrenceLocation, setOccurrenceLocation] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [events, setEvents] = useState<any[]>([]);

  // Fetch existing events on component mount
  useEffect(() => {
    getEvents();
  }, []);

  // Set single event date to start date when start date changes (if they're the same)
  useEffect(() => {
    if (isSingleEvent && startDate && (!date || startDate === endDate)) {
      setDate(startDate);
    }
  }, [startDate, date, isSingleEvent, endDate]);

  // Reset date fields when switching between single and recurring
  useEffect(() => {
    if (isSingleEvent) {
      // For single events, end date should match start date by default
      if (startDate && !endDate) {
        setEndDate(startDate);
      }
    }
  }, [isSingleEvent, startDate, endDate]);

  const getEvents = async () => {
    try {
      const response = await fetchEvents();
      
      if (!response.success) {
        throw new Error(response.error);
      }
      
      setEvents(response.data || []);
    } catch (error: any) {
      console.error('Error fetching events:', error);
      setMessage({ text: 'Failed to load events: ' + error.message, type: 'error' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Validate required fields
      if (!title || !startDate || !endDate) {
        throw new Error('Title, Start Date, and End Date are required');
      }

      // Validate start and end dates
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      
      if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        throw new Error('Invalid start or end date');
      }
      
      if (startDateObj > endDateObj) {
        throw new Error('Start date must be before end date');
      }

      // Validate price is a valid number
      const priceValue = parseFloat(price);
      if (isNaN(priceValue)) {
        throw new Error('Price must be a valid number');
      }

      // Validate capacity is a valid integer
      const capacityValue = capacity ? parseInt(capacity) : null;
      if (capacity && isNaN(capacityValue as number)) {
        throw new Error('Capacity must be a valid number');
      }

      // Single event validation
      if (isSingleEvent) {
        if (!date || !startTime || !endTime) {
          throw new Error('Date, Start Time, and End Time are required for single events');
        }
        
        const eventDate = new Date(date);
        if (eventDate < startDateObj || eventDate > endDateObj) {
          throw new Error('Event date must be within the start and end dates');
        }
      }

      // Create event series and occurrence(s)
      const eventData = {
        // Event Series data
        title,
        description: description || null,
        location: location || null,
        price: isFree ? 0 : priceValue,
        capacity: capacityValue,
        start_date: startDate,
        end_date: endDate,
        category: category || null,
        event_type: eventType || null,
        host: host || null,
        registration_deadline: registrationDeadline || null,
        is_free: isFree,
        is_recurring: isRecurring,
        is_single_event: isSingleEvent,
        
        // First/only occurrence data for single events
        occurrence: isSingleEvent ? {
          date,
          start_time: startTime,
          end_time: endTime,
          description: occurrenceDescription || null,
          location: occurrenceLocation || location || null
        } : null
      };

      const response = await createEvent(eventData);

      if (!response.success) {
        throw new Error(response.error);
      }

      // Reset form after successful submission
      setTitle('');
      setDescription('');
      setLocation('');
      setPrice('0');
      setCapacity('');
      setStartDate('');
      setEndDate('');
      setCategory('');
      setEventType('');
      setHost('');
      setRegistrationDeadline('');
      setIsFree(false);
      setIsRecurring(false);
      setIsSingleEvent(true);
      setDate('');
      setStartTime('');
      setEndTime('');
      setOccurrenceDescription('');
      setOccurrenceLocation('');
      
      setMessage({ text: response.message || 'Event created successfully!', type: 'success' });
      
      // Refresh events list
      getEvents();
    } catch (error: any) {
      console.error('Error creating event:', error);
      
      // Enhanced error messages
      let errorMessage = error.message || 'Failed to create event';
      
      // Check for admin permission errors
      if (errorMessage.includes('permission') || errorMessage.includes('admin role')) {
        setMessage({ 
          text: `${errorMessage} Please contact your administrator for access.`,
          type: 'error' 
        });
      } else {
        setMessage({ text: `Failed to create event: ${errorMessage}`, type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours));
    time.setMinutes(parseInt(minutes));
    
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(time);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Event Management
      </h1>
      
      {/* Event Creation Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
        
        {message.text && (
          <div
            className={`p-4 mb-4 rounded-md ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Type Selection */}
          <div className="flex space-x-4 mb-6">
            <div className="flex items-center">
              <input
                id="singleEvent"
                type="radio"
                checked={isSingleEvent}
                onChange={() => {
                  setIsSingleEvent(true);
                  setIsRecurring(false);
                }}
                className="mr-2 h-4 w-4 text-amber-600"
              />
              <label htmlFor="singleEvent" className="text-sm font-medium text-gray-700">
                Single Event
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="recurringEvent"
                type="radio"
                checked={isRecurring}
                onChange={() => {
                  setIsRecurring(true);
                  setIsSingleEvent(false);
                }}
                className="mr-2 h-4 w-4 text-amber-600"
              />
              <label htmlFor="recurringEvent" className="text-sm font-medium text-gray-700">
                Recurring Event
              </label>
            </div>
          </div>
          
          {/* Common Fields - Always visible */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium mb-4">
              {isRecurring ? 'Event Series Details' : 'Event Details'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Summer Spanish Immersion Camp"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-32"
                  placeholder="Detailed description of the event..."
                />
              </div>
              
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                  {isSingleEvent ? 'Event Date *' : 'Start Date *'}
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              {/* End Date - Only shown for recurring events */}
              {isRecurring && (
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                    End Date *
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}
              
              {/* Single Event Time Fields */}
              {isSingleEvent && (
                <>
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      <ClockIcon className="inline-block w-4 h-4 mr-1" />
                      Start Time *
                    </label>
                    <input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                      <ClockIcon className="inline-block w-4 h-4 mr-1" />
                      End Time *
                    </label>
                    <input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPinIcon className="inline-block w-4 h-4 mr-1" />
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Event Location"
                />
              </div>
              
              <div>
                <div className="flex items-center">
                  <input
                    id="isFree"
                    type="checkbox"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="isFree" className="ml-2 block text-sm text-gray-700">
                    Free Event
                  </label>
                </div>
              </div>
              
              {!isFree && (
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    <CurrencyDollarIcon className="inline-block w-4 h-4 mr-1" />
                    Price ($)
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  <UserGroupIcon className="inline-block w-4 h-4 mr-1" />
                  Capacity
                </label>
                <input
                  id="capacity"
                  type="number"
                  min="1"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Maximum number of attendees"
                />
              </div>
            </div>
          </div>
          
          {/* Advanced fields - Toggleable section */}
          <details className="pt-2 pb-4">
            <summary className="text-lg font-medium cursor-pointer text-amber-700 hover:text-amber-800">
              Advanced Options
            </summary>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-1">
                  <UserGroupIcon className="inline-block w-4 h-4 mr-1" />
                  Host
                </label>
                <input
                  id="host"
                  type="text"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Host name"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  <TagIcon className="inline-block w-4 h-4 mr-1" />
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Event Category"
                />
              </div>
              
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                  <TagIcon className="inline-block w-4 h-4 mr-1" />
                  Event Type
                </label>
                <input
                  id="eventType"
                  type="text"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Workshop, Camp, Class, etc."
                />
              </div>
              
              <div>
                <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                  <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                  Registration Deadline
                </label>
                <input
                  id="registrationDeadline"
                  type="datetime-local"
                  value={registrationDeadline}
                  onChange={(e) => setRegistrationDeadline(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              {/* Single event - Specific location and description */}
              {isSingleEvent && (
                <>
                  <div>
                    <label htmlFor="occurrenceLocation" className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPinIcon className="inline-block w-4 h-4 mr-1" />
                      Specific Location
                      {location && " (overrides default)"}
                    </label>
                    <input
                      id="occurrenceLocation"
                      type="text"
                      value={occurrenceLocation}
                      onChange={(e) => setOccurrenceLocation(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Specific location for this occurrence"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="occurrenceDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Specific Description
                      {description && " (adds details to the main description)"}
                    </label>
                    <textarea
                      id="occurrenceDescription"
                      value={occurrenceDescription}
                      onChange={(e) => setOccurrenceDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Additional details specific to this occurrence"
                    />
                  </div>
                </>
              )}
              
              {/* Recurring event specific options would go here */}
              {isRecurring && (
                <div className="md:col-span-2 p-4 bg-amber-50 rounded-md border border-amber-200">
                  <p className="text-amber-800">
                    <ArrowPathIcon className="inline-block w-5 h-5 mr-2" />
                    Recurring events can be configured with specific occurrences after creation.
                  </p>
                </div>
              )}
            </div>
          </details>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-amber-300"
            >
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Events List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        
        {events.length === 0 ? (
          <p className="text-gray-500 italic">No events found. Create your first event above!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event: any) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{event.title}</div>
                      {event.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {event.description.length > 100
                            ? `${event.description.substring(0, 100)}...`
                            : event.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.start_date ? (
                        <>
                          {formatDate(event.start_date)}
                          {event.end_date && event.end_date !== event.start_date && (
                            <> to {formatDate(event.end_date)}</>
                          )}
                        </>
                      ) : (
                        formatDate(event.date)
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.is_free ? 'Free' : `$${parseFloat(event.price).toFixed(2)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.is_recurring ? 'Recurring' : 'Single Event'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}