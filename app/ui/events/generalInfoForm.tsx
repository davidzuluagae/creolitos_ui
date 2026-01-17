'use client';

import { useState } from 'react';
import { MapPinIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Switch } from '@headlessui/react';


export default function AdminEventsPage() {
  // Event Series fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('0');
  const [capacity, setCapacity] = useState('');
  const [category, setCategory] = useState('');
  const [isFree, setIsFree] = useState(false);

  // Predefined category options
  const categories = [
    'Workshop',
    'Class',
    'Camp',
    'storytime',
    'Concert',
    'Cultural Event',
    'Language Exchange',
    'Family Event',
    'Kids Activity'
  ];
  const [categoryQuery, setCategoryQuery] = useState('');


  // Filtered categories based on search query
  const filteredCategories =
    categoryQuery === ''
      ? categories
      : categories.filter((cat) =>
        cat.toLowerCase().includes(categoryQuery.toLowerCase())
      );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [events, setEvents] = useState<any[]>([]);

  // Form validation state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Validate form on submit and show field-level errors
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Required fields validation
    if (!title) errors.title = 'Title is required';

    // Price validation
    if (!isFree && price !== '0') {
      const priceValue = parseFloat(price);
      if (isNaN(priceValue) || priceValue < 0) {
        errors.price = 'Price must be a valid positive number';
      }
    }

    // Capacity validation
    if (capacity) {
      const capacityValue = parseInt(capacity);
      if (isNaN(capacityValue) || capacityValue <= 0) {
        errors.capacity = 'Capacity must be a positive number';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Parse values for the backend
      const priceValue = parseFloat(price);
      const capacityValue = capacity ? parseInt(capacity) : undefined;

      // Create event series and occurrence(s)
      const eventData = {
        // Event Series data
        title,
        description: description || undefined,
        location: location || undefined,
        price: isFree ? 0 : priceValue,
        capacity: capacityValue,
        category: category || undefined,
        is_free: isFree,

      };

      // Reset form after successful submission
      setTitle('');
      setDescription('');
      setLocation('');
      setPrice('0');
      setCapacity('');
      setCategory('');
      setIsFree(false);

      setMessage({ text: 'Event created successfully!', type: 'success' });
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
            className={`p-4 mb-4 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Common Fields - Always visible */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium mb-4">
              {'Event Details'}
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
                  className={`w-full border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${formErrors.title ? 'focus:ring-red-500' : 'focus:ring-amber-500'}`}
                  placeholder="Summer Spanish Immersion Camp"
                  aria-describedby={formErrors.title ? 'title-error' : undefined}
                />
                {formErrors.title && (
                  <p id="title-error" className="mt-1 text-xs text-red-600">{formErrors.title}</p>
                )}
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
                  <Switch
                    checked={isFree}
                    onChange={setIsFree}
                    className={`${isFree ? 'bg-amber-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
                  >
                    <span className="sr-only">Free Event</span>
                    <span
                      className={`${isFree ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
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
                  {formErrors.price && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.price}</p>
                  )}
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
                {formErrors.capacity && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.capacity}</p>
                )}
              </div>
            </div>
          </div>


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

    </div>
  );
}