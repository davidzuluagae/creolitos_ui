'use server';

import { createClient } from '@/utils/supabase/supabaseServer';
import { revalidatePath } from 'next/cache';

interface EventOccurrenceData {
  date: string;
  start_time: string;
  end_time: string;
  description: string | null;
  location: string | null;
}

interface EventSeriesData {
  title: string;
  description: string | null;
  location: string | null;
  price: number;
  capacity: number | null;
  start_date: string;
  end_date: string;
  category: string | null;
  event_type: string | null;
  host: string | null;
  registration_deadline: string | null;
  is_free: boolean;
  is_recurring: boolean;
  is_single_event: boolean;
  occurrence: EventOccurrenceData | null;
}

export async function createEvent(formData: EventSeriesData) {
  try {
    // Create Supabase client
    const supabase = await createClient();
    
    // Check if the user has admin privileges first
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      return { 
        success: false, 
        error: 'You must be logged in to create events' 
      };
    }
    
    // Debug: Log user ID to confirm we're using the correct one
    console.log('Checking admin role for user ID:', session.session.user.id);
    
    // Get user profile with role - query needs to be adjusted for custom type
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.session.user.id)
      .single();
    
    // Debug profile query results
    console.log('User profile query result:', userProfile, 'Error:', profileError);
    
    // Check if profile exists and has admin role
    // Using toString and toLowerCase for more robust comparison
    if (!userProfile || String(userProfile.role).toLowerCase() !== 'admin') {
      return { 
        success: false, 
        error: `You do not have permission to create events. Admin role is required. Current role: ${userProfile?.role || 'unknown'}` 
      };
    }
    
    // Insert the event series into the database
    const { data: eventSeriesData, error: eventSeriesError } = await supabase
      .from('event_series')
      .insert([{
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: formData.price,
        capacity: formData.capacity,
        start_date: formData.start_date,
        end_date: formData.end_date,
        category: formData.category,
        event_type: formData.event_type,
        host: formData.host,
        registration_deadline: formData.registration_deadline,
        is_free: formData.is_free,
        is_recurring: formData.is_recurring,
        is_single_event: formData.is_single_event,
        created_at: new Date().toISOString(),
      }])
      .select();

    if (eventSeriesError) {
      console.error('Error inserting event series:', eventSeriesError);
      return { success: false, error: eventSeriesError.message };
    }

    // For single events, create an occurrence
    if (formData.is_single_event && formData.occurrence) {
      const { data: occurrenceData, error: occurrenceError } = await supabase
        .from('event_occurrences')
        .insert([{
          series_id: eventSeriesData[0].id,
          date: formData.occurrence.date,
          start_time: formData.occurrence.start_time,
          end_time: formData.occurrence.end_time,
          description: formData.occurrence.description,
          location: formData.occurrence.location || formData.location,
          is_active: true,
        }])
        .select();

      if (occurrenceError) {
        // If occurrence creation fails, attempt to clean up the series
        await supabase
          .from('event_series')
          .delete()
          .eq('id', eventSeriesData[0].id);
        
        return { success: false, error: occurrenceError.message };
      }
    }

    // Revalidate the events pages
    revalidatePath('/admin/events');
    revalidatePath('/main/events');
    
    return { 
      success: true, 
      data: eventSeriesData[0],
      message: 'Event created successfully!' 
    };
  } catch (error: any) {
    console.error('Error creating event:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred'
    };
  }
}

export async function fetchEvents() {
  try {
    // Create Supabase client
    const supabase = await createClient();
    
    // Fetch event series with their first occurrence
    const { data: eventSeriesData, error: eventSeriesError } = await supabase
      .from('event_series')
      .select('*')
      .order('start_date', { ascending: true });

    if (eventSeriesError) {
      return { success: false, error: eventSeriesError.message };
    }

    // For each event series, fetch its occurrences
    const eventsWithOccurrences = await Promise.all(
      eventSeriesData.map(async (series) => {
        const { data: occurrences, error: occurrencesError } = await supabase
          .from('event_occurrences')
          .select('*')
          .eq('series_id', series.id)
          .order('date', { ascending: true });

        if (occurrencesError) {
          console.error('Error fetching occurrences for series', series.id, occurrencesError);
          return {
            ...series,
            occurrences: []
          };
        }

        return {
          ...series,
          occurrences: occurrences || []
        };
      })
    );
    
    return { 
      success: true, 
      data: eventsWithOccurrences
    };
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred'
    };
  }
}