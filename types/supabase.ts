export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          published_at: string | null
          slug: string
          title: string
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug: string
          title: string
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          message: string | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
        }
        Relationships: []
      }
      event_occurrences: {
        Row: {
          capacity_override: number | null
          date: string
          description: string | null
          end_time: string
          id: string
          is_active: boolean | null
          location: string | null
          price_override: number | null
          schedule: Json | null
          series_id: string
          start_time: string
        }
        Insert: {
          capacity_override?: number | null
          date: string
          description?: string | null
          end_time: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          price_override?: number | null
          schedule?: Json | null
          series_id: string
          start_time: string
        }
        Update: {
          capacity_override?: number | null
          date?: string
          description?: string | null
          end_time?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          price_override?: number | null
          schedule?: Json | null
          series_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_occurrences_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "event_series"
            referencedColumns: ["id"]
          },
        ]
      }
      event_series: {
        Row: {
          age_restriction: Json | null
          capacity: number | null
          category: string | null
          created_at: string | null
          description: string | null
          end_date: string
          event_type: string | null
          flyer_url: string | null
          host: string | null
          id: string
          is_free: boolean | null
          is_recurring: boolean | null
          is_single_event: boolean | null
          location: string | null
          price: number
          recurring_pattern: Json | null
          registration_deadline: string | null
          social_media: Json | null
          start_date: string
          status: string
          ticket_tiers: Json | null
          title: string
        }
        Insert: {
          age_restriction?: Json | null
          capacity?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_date: string
          event_type?: string | null
          flyer_url?: string | null
          host?: string | null
          id?: string
          is_free?: boolean | null
          is_recurring?: boolean | null
          is_single_event?: boolean | null
          location?: string | null
          price: number
          recurring_pattern?: Json | null
          registration_deadline?: string | null
          social_media?: Json | null
          start_date: string
          status?: string
          ticket_tiers?: Json | null
          title: string
        }
        Update: {
          age_restriction?: Json | null
          capacity?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string
          event_type?: string | null
          flyer_url?: string | null
          host?: string | null
          id?: string
          is_free?: boolean | null
          is_recurring?: boolean | null
          is_single_event?: boolean | null
          location?: string | null
          price?: number
          recurring_pattern?: Json | null
          registration_deadline?: string | null
          social_media?: Json | null
          start_date?: string
          status?: string
          ticket_tiers?: Json | null
          title?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number | null
          created_at: string | null
          event_id: string | null
          id: string
          occurrence_id: string | null
          series_id: string | null
          status: string | null
          stripe_session_id: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          occurrence_id?: string | null
          series_id?: string | null
          status?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          occurrence_id?: string | null
          series_id?: string | null
          status?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_occurrence_id_fkey"
            columns: ["occurrence_id"]
            isOneToOne: false
            referencedRelation: "event_occurrences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "event_series"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: number
          name: string | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      registration_details: {
        Row: {
          consent_forms: Json | null
          created_at: string | null
          dietary_restrictions: string | null
          emergency_contact: Json | null
          id: string
          medical_info: Json | null
          pickup_authorized_people: Json | null
          rsvp_id: string
          t_shirt_size: string | null
        }
        Insert: {
          consent_forms?: Json | null
          created_at?: string | null
          dietary_restrictions?: string | null
          emergency_contact?: Json | null
          id?: string
          medical_info?: Json | null
          pickup_authorized_people?: Json | null
          rsvp_id: string
          t_shirt_size?: string | null
        }
        Update: {
          consent_forms?: Json | null
          created_at?: string | null
          dietary_restrictions?: string | null
          emergency_contact?: Json | null
          id?: string
          medical_info?: Json | null
          pickup_authorized_people?: Json | null
          rsvp_id?: string
          t_shirt_size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registration_details_rsvp_id_fkey"
            columns: ["rsvp_id"]
            isOneToOne: false
            referencedRelation: "rsvps"
            referencedColumns: ["id"]
          },
        ]
      }
      rsvps: {
        Row: {
          additional_info: Json | null
          created_at: string | null
          event_id: string | null
          id: string
          occurrence_id: string | null
          payment_amount: number | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          registered_at: string | null
          series_id: string | null
          status: Database["public"]["Enums"]["rsvp_status"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_info?: Json | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          occurrence_id?: string | null
          payment_amount?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          registered_at?: string | null
          series_id?: string | null
          status?: Database["public"]["Enums"]["rsvp_status"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_info?: Json | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          occurrence_id?: string | null
          payment_amount?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          registered_at?: string | null
          series_id?: string | null
          status?: Database["public"]["Enums"]["rsvp_status"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rsvps_occurrence_id_fkey"
            columns: ["occurrence_id"]
            isOneToOne: false
            referencedRelation: "event_occurrences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rsvps_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "event_series"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
      generate_event_occurrences: {
        Args: {
          p_end_date: string
          p_recurring_pattern: Json
          p_series_id: string
          p_start_date: string
        }
        Returns: undefined
      }
      not_used_authorize_op: {
        Args: { requested_permission: number }
        Returns: boolean
      }
      update_event_statuses: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      event_status:
        | "upcoming"
        | "ongoing"
        | "completed"
        | "cancelled"
        | "postponed"
      payment_status: "pending" | "paid" | "failed" | "free" | "refunded"
      rsvp_status: "going" | "not_going" | "maybe"
      user_role: "admin" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_status: [
        "upcoming",
        "ongoing",
        "completed",
        "cancelled",
        "postponed",
      ],
      payment_status: ["pending", "paid", "failed", "free", "refunded"],
      rsvp_status: ["going", "not_going", "maybe"],
      user_role: ["admin", "customer"],
    },
  },
} as const
