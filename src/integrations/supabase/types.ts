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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      answers: {
        Row: {
          created_at: string
          id: string
          is_correct: boolean
          player_id: string
          points_earned: number
          question_id: string
          response_time: number
          room_id: string
          selected_answer: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_correct: boolean
          player_id: string
          points_earned?: number
          question_id: string
          response_time: number
          room_id: string
          selected_answer: number
        }
        Update: {
          created_at?: string
          id?: string
          is_correct?: boolean
          player_id?: string
          points_earned?: number
          question_id?: string
          response_time?: number
          room_id?: string
          selected_answer?: number
        }
        Relationships: [
          {
            foreignKeyName: "answers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          event_data: Json
          event_type: string
          id: string
          room_id: string
        }
        Insert: {
          created_at?: string
          event_data?: Json
          event_type: string
          id?: string
          room_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json
          event_type?: string
          id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      player_secrets: {
        Row: {
          player_id: string
          token_hash: string
        }
        Insert: {
          player_id: string
          token_hash: string
        }
        Update: {
          player_id?: string
          token_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_secrets_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          best_streak: number
          completed: boolean
          correct_answers: number
          id: string
          incorrect_answers: number
          joined_at: string
          last_activity_at: string
          last_answered_question: string | null
          nickname: string
          room_id: string
          score: number
          streak: number
          total_response_ms: number
        }
        Insert: {
          best_streak?: number
          completed?: boolean
          correct_answers?: number
          id?: string
          incorrect_answers?: number
          joined_at?: string
          last_activity_at?: string
          last_answered_question?: string | null
          nickname: string
          room_id: string
          score?: number
          streak?: number
          total_response_ms?: number
        }
        Update: {
          best_streak?: number
          completed?: boolean
          correct_answers?: number
          id?: string
          incorrect_answers?: number
          joined_at?: string
          last_activity_at?: string
          last_answered_question?: string | null
          nickname?: string
          room_id?: string
          score?: number
          streak?: number
          total_response_ms?: number
        }
        Relationships: [
          {
            foreignKeyName: "players_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          case_info: Json | null
          clues: Json | null
          correct_answer: number
          difficulty: string
          explanation: string
          id: string
          kind: string
          media: string | null
          options: Json
          phase: string
          points: number
          position: number
          question_text: string
          time_limit: number
          why_wrong: Json | null
        }
        Insert: {
          case_info?: Json | null
          clues?: Json | null
          correct_answer: number
          difficulty?: string
          explanation: string
          id?: string
          kind?: string
          media?: string | null
          options: Json
          phase: string
          points?: number
          position: number
          question_text: string
          time_limit?: number
          why_wrong?: Json | null
        }
        Update: {
          case_info?: Json | null
          clues?: Json | null
          correct_answer?: number
          difficulty?: string
          explanation?: string
          id?: string
          kind?: string
          media?: string | null
          options?: Json
          phase?: string
          points?: number
          position?: number
          question_text?: string
          time_limit?: number
          why_wrong?: Json | null
        }
        Relationships: []
      }
      room_secrets: {
        Row: {
          password_hash: string
          room_id: string
          teacher_token_hash: string
        }
        Insert: {
          password_hash: string
          room_id: string
          teacher_token_hash: string
        }
        Update: {
          password_hash?: string
          room_id?: string
          teacher_token_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_secrets_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: true
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          control_mode: string
          created_at: string
          current_phase: string | null
          current_question: number
          expires_at: string
          id: string
          paused_from: string | null
          paused_remaining_ms: number | null
          phase_started_at: string | null
          question_count: number
          question_id: string | null
          room_code: string
          status: string
          teacher_session_id: string
          timer_duration: number | null
        }
        Insert: {
          control_mode?: string
          created_at?: string
          current_phase?: string | null
          current_question?: number
          expires_at?: string
          id?: string
          paused_from?: string | null
          paused_remaining_ms?: number | null
          phase_started_at?: string | null
          question_count?: number
          question_id?: string | null
          room_code: string
          status?: string
          teacher_session_id?: string
          timer_duration?: number | null
        }
        Update: {
          control_mode?: string
          created_at?: string
          current_phase?: string | null
          current_question?: number
          expires_at?: string
          id?: string
          paused_from?: string | null
          paused_remaining_ms?: number | null
          phase_started_at?: string | null
          question_count?: number
          question_id?: string | null
          room_code?: string
          status?: string
          teacher_session_id?: string
          timer_duration?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      record_answer: {
        Args: {
          p_correct: boolean
          p_ms: number
          p_player: string
          p_points: number
          p_question: string
          p_room: string
          p_selected: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
