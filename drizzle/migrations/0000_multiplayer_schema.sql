
CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'lobby',
  current_phase text,
  current_question integer NOT NULL DEFAULT 0,
  question_id uuid,
  question_count integer NOT NULL DEFAULT 0,
  control_mode text NOT NULL DEFAULT 'manual',
  timer_duration integer,
  phase_started_at timestamptz,
  paused_remaining_ms integer,
  paused_from text,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '12 hours',
  teacher_session_id uuid NOT NULL DEFAULT gen_random_uuid()
);
GRANT SELECT (id, room_code, status, current_phase, current_question, question_id, question_count, control_mode, timer_duration, phase_started_at, paused_remaining_ms, paused_from, created_at, expires_at) ON public.rooms TO anon, authenticated;
GRANT ALL ON public.rooms TO service_role;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rooms readable" ON public.rooms FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.room_secrets (
  room_id uuid PRIMARY KEY REFERENCES public.rooms(id) ON DELETE CASCADE,
  password_hash text NOT NULL,
  teacher_token_hash text NOT NULL
);
GRANT ALL ON public.room_secrets TO service_role;
ALTER TABLE public.room_secrets ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  nickname text NOT NULL,
  score integer NOT NULL DEFAULT 0 CHECK (score >= 0),
  correct_answers integer NOT NULL DEFAULT 0,
  incorrect_answers integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  best_streak integer NOT NULL DEFAULT 0,
  total_response_ms bigint NOT NULL DEFAULT 0,
  last_answered_question uuid,
  completed boolean NOT NULL DEFAULT false,
  joined_at timestamptz NOT NULL DEFAULT now(),
  last_activity_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX players_room_nick ON public.players (room_id, lower(nickname));
CREATE INDEX players_room ON public.players (room_id);
GRANT SELECT ON public.players TO anon, authenticated;
GRANT ALL ON public.players TO service_role;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "players readable" ON public.players FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.player_secrets (
  player_id uuid PRIMARY KEY REFERENCES public.players(id) ON DELETE CASCADE,
  token_hash text NOT NULL
);
GRANT ALL ON public.player_secrets TO service_role;
ALTER TABLE public.player_secrets ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase text NOT NULL,
  position integer NOT NULL,
  kind text NOT NULL DEFAULT 'standard',
  question_text text NOT NULL,
  options jsonb NOT NULL,
  correct_answer integer NOT NULL,
  explanation text NOT NULL,
  why_wrong jsonb,
  case_info jsonb,
  clues jsonb,
  media text,
  difficulty text NOT NULL DEFAULT 'medio',
  points integer NOT NULL DEFAULT 100,
  time_limit integer NOT NULL DEFAULT 40,
  UNIQUE (phase, position)
);
-- Students can read the question, never the answer key or explanations.
GRANT SELECT (id, phase, position, kind, question_text, options, case_info, clues, media, difficulty, points, time_limit) ON public.questions TO anon, authenticated;
GRANT ALL ON public.questions TO service_role;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "questions readable" ON public.questions FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_answer integer NOT NULL,
  is_correct boolean NOT NULL,
  points_earned integer NOT NULL DEFAULT 0,
  response_time integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (player_id, question_id)
);
CREATE INDEX answers_room_q ON public.answers (room_id, question_id);
GRANT ALL ON public.answers TO service_role;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX events_room ON public.events (room_id, created_at);
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Atomic answer recording: unique constraint blocks duplicates; stats updated in the same transaction.
CREATE OR REPLACE FUNCTION public.record_answer(
  p_room uuid, p_player uuid, p_question uuid, p_selected integer,
  p_correct boolean, p_points integer, p_ms integer
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO answers (room_id, player_id, question_id, selected_answer, is_correct, points_earned, response_time)
  VALUES (p_room, p_player, p_question, p_selected, p_correct, GREATEST(p_points, 0), p_ms);
  UPDATE players SET
    score = score + GREATEST(p_points, 0),
    correct_answers = correct_answers + CASE WHEN p_correct THEN 1 ELSE 0 END,
    incorrect_answers = incorrect_answers + CASE WHEN p_correct THEN 0 ELSE 1 END,
    streak = CASE WHEN p_correct THEN streak + 1 ELSE 0 END,
    best_streak = GREATEST(best_streak, CASE WHEN p_correct THEN streak + 1 ELSE 0 END),
    total_response_ms = total_response_ms + p_ms,
    last_answered_question = p_question,
    last_activity_at = now()
  WHERE id = p_player AND room_id = p_room;
END $$;
REVOKE ALL ON FUNCTION public.record_answer FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_answer TO service_role;

ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;
