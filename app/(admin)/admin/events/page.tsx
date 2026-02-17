'use client';

import { useState, useEffect, Fragment } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon, UserGroupIcon, TagIcon, ArrowPathIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { createEvent, fetchEvents } from './actions';
import { Switch, RadioGroup, Disclosure, Combobox, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';

export default function AdminEventsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Events Disabled</h1>
      <p className="text-gray-600">
        Event management is temporarily disabled while we migrate to Eventbrite.
      </p>
    </div>
  );

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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Type Selection - HeadlessUI RadioGroup */}
          <RadioGroup value={isSingleEvent ? 'single' : 'recurring'} onChange={(value) => {
            if (value === 'single') {
              setIsSingleEvent(true);
              setIsRecurring(false);
            } else {
              setIsRecurring(true);
              setIsSingleEvent(false);
            }
          }} className="mb-6">
            <RadioGroup.Label className="sr-only">Event Type</RadioGroup.Label>
            <div className="flex space-x-4">
              <RadioGroup.Option value="single" className={({ checked }) => `
                ${checked ? 'bg-amber-50 border-amber-500' : 'bg-white'}
                relative flex cursor-pointer rounded-lg px-4 py-2 border focus:outline-none
              `}>
                {({ checked }) => (
                  <div className="flex items-center">
                    <div className={`rounded-full h-4 w-4 flex items-center justify-center mr-2 ${checked ? 'bg-amber-600' : 'border border-gray-300'}`}>
                      {checked && <div className="rounded-full h-2 w-2 bg-white"></div>}
                    </div>
                    <RadioGroup.Label as="p" className={`text-sm font-medium ${checked ? 'text-amber-900' : 'text-gray-700'}`}>
                      Single Event
                    </RadioGroup.Label>
                  </div>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="recurring" className={({ checked }) => `
                ${checked ? 'bg-amber-50 border-amber-500' : 'bg-white'}
                relative flex cursor-pointer rounded-lg px-4 py-2 border focus:outline-none
              `}>
                {({ checked }) => (
                  <div className="flex items-center">
                    <div className={`rounded-full h-4 w-4 flex items-center justify-center mr-2 ${checked ? 'bg-amber-600' : 'border border-gray-300'}`}>
                      {checked && <div className="rounded-full h-2 w-2 bg-white"></div>}
                    </div>
                    <RadioGroup.Label as="p" className={`text-sm font-medium ${checked ? 'text-amber-900' : 'text-gray-700'}`}>
                      Recurring Event
                    </RadioGroup.Label>
                  </div>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>

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
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                  {isSingleEvent ? 'Event Date *' : 'Start Date *'}
                </label>
                <div className="relative">
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    aria-describedby="startDateFormat"
                  />
                  {startDate && (
                    <div className="absolute right-3 top-2.5 text-xs text-gray-500">
                      {format(new Date(startDate), 'MMM d, yyyy')}
                    </div>
                  )}
                </div>
                <p id="startDateFormat" className="mt-1 text-xs text-gray-500">Format: YYYY-MM-DD</p>
                {formErrors.startDate && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.startDate}</p>
                )}
              </div>

              {/* End Date - Only shown for recurring events */}
              {isRecurring && (
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                    End Date *
                  </label>
                  <div className="relative">
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      aria-describedby="endDateFormat"
                    />
                    {endDate && (
                      <div className="absolute right-3 top-2.5 text-xs text-gray-500">
                        {format(new Date(endDate), 'MMM d, yyyy')}
                      </div>
                    )}
                  </div>
                  <p id="endDateFormat" className="mt-1 text-xs text-gray-500">Format: YYYY-MM-DD</p>
                  {formErrors.endDate && (
                    <p className="mt-1 text-xs text-red-600">{formErrors.endDate}</p>
                  )}
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
                    {formErrors.startTime && (
                      <p className="mt-1 text-xs text-red-600">{formErrors.startTime}</p>
                    )}
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
                    {formErrors.endTime && (
                      <p className="mt-1 text-xs text-red-600">{formErrors.endTime}</p>
                    )}
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
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Date Range
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event: any) => (
                  <tr key={event.id} className="hover:bg-amber-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{event.title}</div>
                      {event.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {event.description.length > 100
                            ? `${event.description.substring(0, 100)}...`
                            : event.description}
                        </div>
                      )}
                      {event.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mt-1">
                          {event.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.start_date ? (
                        <div className="flex flex-col">
                          <span className="font-medium">{format(new Date(event.start_date), 'MMM d, yyyy')}</span>
                          {event.end_date && event.end_date !== event.start_date && (
                            <span className="text-gray-400">to {format(new Date(event.end_date), 'MMM d, yyyy')}</span>
                          )}
                        </div>
                      ) : (
                        format(new Date(event.date), 'MMM d, yyyy')
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 text-gray-400 mr-1 flex-shrink-0" />
                        <span>{event.location || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {event.is_free ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Free
                        </span>
                      ) : (
                        <span className="font-medium text-gray-900">${parseFloat(event.price).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {event.is_recurring ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <ArrowPathIcon className="h-3 w-3 mr-1" />
                          Recurring
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Single Event
                        </span>
                      )}
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
