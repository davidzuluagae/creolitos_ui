'use client';

import { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { RadioGroup } from '@headlessui/react';
import { format } from 'date-fns';

export default function AdminEventsPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [registrationDeadline, setRegistrationDeadline] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [isSingleEvent, setIsSingleEvent] = useState(true);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [occurrenceDescription, setOccurrenceDescription] = useState('');
    const [occurrenceLocation, setOccurrenceLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isSingleEvent && startDate && (!date || startDate === endDate)) {
            setDate(startDate);
        }
    }, [startDate, date, isSingleEvent, endDate]);

    useEffect(() => {
        if (isSingleEvent && startDate && !endDate) {
            setEndDate(startDate);
        }
    }, [isSingleEvent, startDate, endDate]);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (start > end) {
                setFormErrors((prev) => ({
                    ...prev,
                    endDate: 'End date must be after start date',
                }));
            } else {
                setFormErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.endDate;
                    return newErrors;
                });
            }
        }
    }, [startDate, endDate]);

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!startDate) errors.startDate = 'Start date is required';
        if (isRecurring && !endDate) errors.endDate = 'End date is required';
        if (isSingleEvent) {
            if (!date) errors.date = 'Event date is required';
            if (!startTime) errors.startTime = 'Start time is required';
            if (!endTime) errors.endTime = 'End time is required';
        }
        if (startDate && endDate) {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            if (startDateObj > endDateObj) {
                errors.endDate = 'End date must be after start date';
            }
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});
        if (!validateForm()) return;

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const eventData = {
                start_date: startDate,
                end_date: endDate || startDate,
                registration_deadline: registrationDeadline || undefined,
                is_recurring: isRecurring,
                is_single_event: isSingleEvent,
                occurrence: isSingleEvent
                    ? {
                          date,
                          start_time: startTime,
                          end_time: endTime,
                          description: occurrenceDescription || undefined,
                          location: occurrenceLocation || undefined,
                      }
                    : undefined,
            };

            setStartDate('');
            setEndDate('');
            setRegistrationDeadline('');
            setIsRecurring(false);
            setIsSingleEvent(true);
            setDate('');
            setStartTime('');
            setEndTime('');
            setOccurrenceDescription('');
            setOccurrenceLocation('');
            setMessage({ text: 'Event created successfully!', type: 'success' });
        } catch (error: any) {
            console.error('Error creating event:', error);
            const errorMessage = error.message || 'Failed to create event';
            setMessage({
                text: `Failed to create event: ${errorMessage}`,
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <div className="bg-white p-6 rounded-lg shadow-md mb-10">
                <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
                {message.text && (
                    <div
                        className={`p-4 mb-4 rounded-md ${
                            message.type === 'error'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                        }`}
                    >
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <RadioGroup
                        value={isSingleEvent ? 'single' : 'recurring'}
                        onChange={(value) => {
                            if (value === 'single') {
                                setIsSingleEvent(true);
                                setIsRecurring(false);
                            } else {
                                setIsRecurring(true);
                                setIsSingleEvent(false);
                            }
                        }}
                        className="mb-6"
                    >
                        <RadioGroup.Label className="sr-only">Event Type</RadioGroup.Label>
                        <div className="flex space-x-4">
                            <RadioGroup.Option
                                value="single"
                                className={({ checked }) =>
                                    `${
                                        checked
                                            ? 'bg-amber-50 border-amber-500'
                                            : 'bg-white'
                                    } relative flex cursor-pointer rounded-lg px-4 py-2 border focus:outline-none`
                                }
                            >
                                {({ checked }) => (
                                    <div className="flex items-center">
                                        <div
                                            className={`rounded-full h-4 w-4 flex items-center justify-center mr-2 ${
                                                checked
                                                    ? 'bg-amber-600'
                                                    : 'border border-gray-300'
                                            }`}
                                        >
                                            {checked && (
                                                <div className="rounded-full h-2 w-2 bg-white"></div>
                                            )}
                                        </div>
                                        <RadioGroup.Label
                                            as="p"
                                            className={`text-sm font-medium ${
                                                checked
                                                    ? 'text-amber-900'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            Single Event
                                        </RadioGroup.Label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option
                                value="recurring"
                                className={({ checked }) =>
                                    `${
                                        checked
                                            ? 'bg-amber-50 border-amber-500'
                                            : 'bg-white'
                                    } relative flex cursor-pointer rounded-lg px-4 py-2 border focus:outline-none`
                                }
                            >
                                {({ checked }) => (
                                    <div className="flex items-center">
                                        <div
                                            className={`rounded-full h-4 w-4 flex items-center justify-center mr-2 ${
                                                checked
                                                    ? 'bg-amber-600'
                                                    : 'border border-gray-300'
                                            }`}
                                        >
                                            {checked && (
                                                <div className="rounded-full h-2 w-2 bg-white"></div>
                                            )}
                                        </div>
                                        <RadioGroup.Label
                                            as="p"
                                            className={`text-sm font-medium ${
                                                checked
                                                    ? 'text-amber-900'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            Recurring Event
                                        </RadioGroup.Label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                        </div>
                    </RadioGroup>
                    <div className="border-b pb-6">
                        <h3 className="text-lg font-medium mb-4">
                            {isRecurring
                                ? 'Event Series Details'
                                : 'Event Details'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="startDate"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                                    {isSingleEvent
                                        ? 'Event Date *'
                                        : 'Start Date *'}
                                </label>
                                <input
                                    id="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    required
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                                {formErrors.startDate && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {formErrors.startDate}
                                    </p>
                                )}
                            </div>
                            {isRecurring && (
                                <div>
                                    <label
                                        htmlFor="endDate"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                                        End Date *
                                    </label>
                                    <input
                                        id="endDate"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                        required
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    {formErrors.endDate && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {formErrors.endDate}
                                        </p>
                                    )}
                                </div>
                            )}
                            {isSingleEvent && (
                                <>
                                    <div>
                                        <label
                                            htmlFor="startTime"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            <ClockIcon className="inline-block w-4 h-4 mr-1" />
                                            Start Time *
                                        </label>
                                        <input
                                            id="startTime"
                                            type="time"
                                            value={startTime}
                                            onChange={(e) =>
                                                setStartTime(e.target.value)
                                            }
                                            required
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        {formErrors.startTime && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {formErrors.startTime}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="endTime"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            <ClockIcon className="inline-block w-4 h-4 mr-1" />
                                            End Time *
                                        </label>
                                        <input
                                            id="endTime"
                                            type="time"
                                            value={endTime}
                                            onChange={(e) =>
                                                setEndTime(e.target.value)
                                            }
                                            required
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        {formErrors.endTime && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {formErrors.endTime}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="registrationDeadline"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                            Registration Deadline
                        </label>
                        <input
                            id="registrationDeadline"
                            type="datetime-local"
                            value={registrationDeadline}
                            onChange={(e) =>
                                setRegistrationDeadline(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
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