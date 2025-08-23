'use server';

import { createClient } from '@/utils/supabase/supabaseServer';
import { revalidatePath } from 'next/cache';

interface EventFormData {
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  price: number;
  capacity: number | null;
}

export async function createEvent(formData: EventFormData) {
  try {
    // Create Supabase client using the new implementation
    const supabase = await createClient();
    
    // Insert the event into the database
    const { data, error } = await supabase
      .from('events')
      .insert([{
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        price: formData.price,
        capacity: formData.capacity,
        created_at: new Date().toISOString(),
      }])
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    // Revalidate the events page to show new data
    revalidatePath('/admin/events');
    revalidatePath('/main/events');
    
    return { 
      success: true, 
      data: data[0],
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
    // Create Supabase client using the new implementation
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }
    
    return { 
      success: true, 
      data 
    };
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred'
    };
  }
}