'use server'

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '' // Use service role key for server-side operations

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Create Supabase client with service role key for backend operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ 
        name: formData.name, 
        email: formData.email, 
        message: formData.message 
      }])

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in submitContactForm server action:', error)
    return { success: false, error: 'Failed to submit form' }
  }
}