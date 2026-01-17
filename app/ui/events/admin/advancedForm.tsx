'use client';

import { useState, useEffect, Fragment } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon, UserGroupIcon, TagIcon, ArrowPathIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { createEvent, fetchEvents } from './actions';
import { Switch, RadioGroup, Disclosure, Combobox, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';

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

  // Predefined event types
  const eventPresence = [
    'In-person',
    'Virtual',
    'Hybrid',
  ];
  const [eventTypeQuery, setEventTypeQuery] = useState('');

  // Filtered categories based on search query
  const filteredCategories =
    categoryQuery === ''
      ? categories
      : categories.filter((cat) =>
        cat.toLowerCase().includes(categoryQuery.toLowerCase())
      );

  // Filtered event types based on search query
  const filteredEventTypes =
    eventTypeQuery === ''
      ? eventPresence
      : eventPresence.filter((type) =>
        type.toLowerCase().includes(eventTypeQuery.toLowerCase())
      );

  // Event Occurrence fields
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [occurrenceDescription, setOccurrenceDescription] = useState('');
  const [occurrenceLocation, setOccurrenceLocation] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [events, setEvents] = useState<any[]>([]);

  // Form validation state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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

  // Validate start and end dates are in logical order
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        setFormErrors(prev => ({
          ...prev,
          endDate: 'End date must be after start date'
        }));
      } else {
        // Clear the error when dates are valid
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.endDate;
          return newErrors;
        });
      }
    }
  }, [startDate, endDate]);

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

  // Validate form on submit and show field-level errors
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Required fields validation
    if (!title) errors.title = 'Title is required';
    if (!startDate) errors.startDate = 'Start date is required';
    if (isRecurring && !endDate) errors.endDate = 'End date is required';

    // Single event validation
    if (isSingleEvent) {
      if (!date) errors.date = 'Event date is required';
      if (!startTime) errors.startTime = 'Start time is required';
      if (!endTime) errors.endTime = 'End time is required';
    }

    // Date validation
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (startDateObj > endDateObj) {
        errors.endDate = 'End date must be after start date';
      }
    }

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
    setFormErrors({});

    // Validate form before submitting
    if (!validateForm()) {
      // Don't proceed if validation fails
      return;
    }

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
        start_date: startDate,
        end_date: endDate || startDate, // Use start date as end date for single events if not provided
        category: category || undefined,
        event_type: eventType || undefined,
        host: host || undefined,
        registration_deadline: registrationDeadline || undefined,
        is_free: isFree,
        is_recurring: isRecurring,
        is_single_event: isSingleEvent,

        // First/only occurrence data for single events
        occurrence: isSingleEvent ? {
          date,
          start_time: startTime,
          end_time: endTime,
          description: occurrenceDescription || undefined,
          location: occurrenceLocation || location || undefined
        } : undefined
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

      setMessage({ text: 'Event created successfully!', type: 'success' });

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
            className={`p-4 mb-4 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
          >
            {message.text}
          </div>
        )}

        {/* Advanced fields - Using HeadlessUI Disclosure */}
        <Disclosure as="div" className="pt-2 pb-4">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between text-lg font-medium text-amber-700 hover:text-amber-800">
                <span>Advanced Options</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-amber-700`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Combobox value={category} onChange={(value) => setCategory(value || '')}>
                      <div className="relative">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500">
                          <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(value) => value as string}
                            onChange={(e) => setCategoryQuery(e.target.value)}
                            placeholder="Select or type a category"
                            id="category"
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setCategoryQuery('')}
                        >
                          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredCategories.length === 0 && categoryQuery !== '' ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                No matching categories. Use this custom category.
                              </div>
                            ) : (
                              filteredCategories.map((cat) => (
                                <Combobox.Option
                                  key={cat}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-600 text-white' : 'text-gray-900'
                                    }`
                                  }
                                  value={cat}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                          }`}
                                      >
                                        {cat}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-amber-600'
                                            }`}
                                        >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
                  </div>

                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                      <TagIcon className="inline-block w-4 h-4 mr-1" />
                      Event Type
                    </label>
                    <Combobox value={eventType} onChange={(value) => setEventType(value || '')}>
                      <div className="relative">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500">
                          <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(value) => value as string}
                            onChange={(e) => setEventTypeQuery(e.target.value)}
                            placeholder="Select or type an event type"
                            id="eventType"
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setEventTypeQuery('')}
                        >
                          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredEventTypes.length === 0 && eventTypeQuery !== '' ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                No matching event types. Use this custom event type.
                              </div>
                            ) : (
                              filteredEventTypes.map((type) => (
                                <Combobox.Option
                                  key={type}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-600 text-white' : 'text-gray-900'
                                    }`
                                  }
                                  value={type}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                          }`}
                                      >
                                        {type}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-amber-600'
                                            }`}
                                        >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
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
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-amber-300"
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
}