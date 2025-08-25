'use server';

import { createClient } from '@/utils/supabase/supabaseServer';
import { revalidatePath } from 'next/cache';
import { Database } from '@/types/supabase';

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
    // Create Supabase client
    const supabase = await createClient();
    
    // Check if the user has admin privileges first
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) {
      return { 
        success: false, 
        error: 'You must be logged in to create events' 
      };
    }

    
    // Explicitly treat user.id as UUID type
    const userUUID: UUID = user.id;

    // Debug: Log user ID to confirm we're using the correct one
    console.log('Checking admin role for user ID:', userUUID);
    
    // Get user profile with role - now properly typed with UUID
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userUUID)
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
    console.error('Error in createEvent server action:', error);
    return { success: false, error: 'Failed to create event' };
  }
}

export async function fetchEvents() {
  try {
    const supabase = await createClient();
    
    // Fetch all event series
    const { data: events, error } = await supabase
      .from('event_series')
      .select('*, event_occurrences(*)');
      
    if (error) {
      console.error('Error fetching events:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data: events };
  } catch (error) {
    console.error('Error in fetchEvents server action:', error);
    return { success: false, error: 'Failed to fetch events' };
  }
}