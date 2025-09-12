'use server';

import { createClient, getAdminClient, createAuthenticatedClient } from '@/utils/supabase/supabaseServer';
import { revalidatePath } from 'next/cache';

// Define UUID type alias to make our intention clear
type UUID = string;

interface EventOccurrenceData {
  date: string;
  start_time: string;
  end_time: string;
  description?: string;
  location?: string;
}

interface EventSeriesData {
  title: string;
  description?: string;
  location?: string;
  price: number;
  capacity?: number;
  start_date: string;
  end_date: string;
  category?: string;
  event_type?: string;
  host?: string;
  registration_deadline?: string;
  is_free?: boolean;
  is_recurring: boolean;
  is_single_event: boolean;
  recurring_pattern?: any;
  occurrence?: EventOccurrenceData;
}

export async function createEvent(formData: EventSeriesData) {
  try {
    // Use getAdminClient to ensure the user has admin privileges
    // This will throw an error if the user is not an admin
    const supabase = await getAdminClient();
    
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
        console.error('Error inserting event occurrence:', occurrenceError);
        return { success: false, error: occurrenceError.message };
      }

      console.log('Created single event with occurrence:', occurrenceData);
    } else if (formData.is_recurring && formData.recurring_pattern) {
      // Call database function to generate occurrences based on recurring pattern
      const { error: recurringError } = await supabase.rpc('generate_event_occurrences', {
        p_series_id: eventSeriesData[0].id,
        p_start_date: formData.start_date,
        p_end_date: formData.end_date,
        p_recurring_pattern: formData.recurring_pattern
      });

      if (recurringError) {
        console.error('Error generating recurring occurrences:', recurringError);
        return { success: false, error: recurringError.message };
      }

      console.log('Created recurring event series');
    }

    // Revalidate related paths to update UI
    revalidatePath('/admin/events');
    revalidatePath('/events');
    
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized: Admin role required') {
      return { 
        success: false, 
        error: 'You do not have permission to create events. Admin role is required.' 
      };
    }
    console.error('Error in createEvent server action:', error);
    return { success: false, error: 'Failed to create event' };
  }
}

export async function fetchEvents() {
  try {
    // Use createAuthenticatedClient to get role information along with client
    const { client: supabase, isAdmin } = await createAuthenticatedClient();
    
    // For non-admin users, fetch only published events
    let query = supabase
      .from('event_series')
      .select('*, event_occurrences(*)');
    
    // If not admin, add filters for public events only
    if (!isAdmin) {
      query = query.eq('is_published', true);
    }
    
    const { data: events, error } = await query;
      
    if (error) {
      console.error('Error fetching events:', error);
      return { success: false, error: error.message };
    }
    
    return { 
      success: true, 
      data: events, 
      isAdmin // Return admin status to the UI
    };
  } catch (error) {
    console.error('Error in fetchEvents server action:', error);
    return { success: false, error: 'Failed to fetch events' };
  }
}