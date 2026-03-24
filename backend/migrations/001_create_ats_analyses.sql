-- Supabase migration: create ats_analyses table
-- Run this in the Supabase SQL editor or via migration CLI

CREATE TABLE IF NOT EXISTS ats_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    job_description TEXT NOT NULL,
    ats_score NUMERIC(5,2),
    semantic_score NUMERIC(5,2),
    keyword_match_score NUMERIC(5,2),
    categories JSONB DEFAULT '[]'::jsonb,
    suggestions JSONB DEFAULT '[]'::jsonb,
    matching_keywords JSONB DEFAULT '[]'::jsonb,
    missing_keywords JSONB DEFAULT '[]'::jsonb,
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE ats_analyses ENABLE ROW LEVEL SECURITY;

-- Users can only see their own analyses
CREATE POLICY "Users can view own analyses"
    ON ats_analyses FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses"
    ON ats_analyses FOR INSERT
    WITH CHECK (auth.uid() = user_id);
