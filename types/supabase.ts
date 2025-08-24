export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Define your tables here
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          location: string | null
          price: number
          capacity: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          location?: string | null
          price: number
          capacity?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          location?: string | null
          price?: number
          capacity?: number | null
          created_at?: string
        }
      }
      event_series: {
        Row: {
          id: string
          title: string
          description: string | null
          location: string | null
          price: number
          capacity: number | null
          created_at: string
          flyer_url: string | null
          status: string
          age_restriction: Json | null
          category: string | null
          ticket_tiers: Json | null
          social_media: Json | null
          host: string | null
          start_date: string
          end_date: string
          registration_deadline: string | null
          event_type: string | null
          is_recurring: boolean
          recurring_pattern: Json | null
          is_free: boolean
          is_single_event: boolean
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          location?: string | null
          price: number
          capacity?: number | null
          created_at?: string
          flyer_url?: string | null
          status?: string
          age_restriction?: Json | null
          category?: string | null
          ticket_tiers?: Json | null
          social_media?: Json | null
          host?: string | null
          start_date: string
          end_date: string
          registration_deadline?: string | null
          event_type?: string | null
          is_recurring?: boolean
          recurring_pattern?: Json | null
          is_free?: boolean
          is_single_event?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          location?: string | null
          price?: number
          capacity?: number | null
          created_at?: string
          flyer_url?: string | null
          status?: string
          age_restriction?: Json | null
          category?: string | null
          ticket_tiers?: Json | null
          social_media?: Json | null
          host?: string | null
          start_date?: string
          end_date?: string
          registration_deadline?: string | null
          event_type?: string | null
          is_recurring?: boolean
          recurring_pattern?: Json | null
          is_free?: boolean
          is_single_event?: boolean
        }
      }
      event_occurrences: {
        Row: {
          id: string
          series_id: string
          date: string
          start_time: string
          end_time: string
          description: string | null
          location: string | null
          is_active: boolean
          schedule: Json | null
          capacity_override: number | null
          price_override: number | null
        }
        Insert: {
          id?: string
          series_id: string
          date: string
          start_time: string
          end_time: string
          description?: string | null
          location?: string | null
          is_active?: boolean
          schedule?: Json | null
          capacity_override?: number | null
          price_override?: number | null
        }
        Update: {
          id?: string
          series_id?: string
          date?: string
          start_time?: string
          end_time?: string
          description?: string | null
          location?: string | null
          is_active?: boolean
          schedule?: Json | null
          capacity_override?: number | null
          price_override?: number | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
        }
      }
      // Add other tables as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}