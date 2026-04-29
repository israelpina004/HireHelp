"""ATS Optimizer Service — Gemini AI-powered resume analysis.

Uses Gemini to perform intelligent, categorized resume-vs-JD analysis
and semantic scoring, completely replacing heavy local ML models to stay 
under memory limits.
"""

import json
from app.utils.gemini_client import get_gemini_model

# ---------------------------------------------------------------------------
# Gemini AI analysis
# ---------------------------------------------------------------------------

_ANALYSIS_PROMPT = """You are an expert ATS (Applicant Tracking System) analyst and career coach.

Analyze the RESUME against the JOB DESCRIPTION below. Provide a thorough, actionable analysis.

## Instructions

1. **Extract real skills and requirements** from the job description — NOT generic phrases. Focus on:
   - Programming languages, frameworks, tools, platforms
   - Soft skills explicitly valued (ownership, communication, etc.)
   - Experience requirements (years, domain, seniority level)
   - Domain knowledge (distributed systems, product development, etc.)

2. **Match each extracted requirement** against the resume. A match means the candidate demonstrably has the skill or experience — even if the exact word isn't used (e.g., "built REST API" matches "API development").

3. **Generate actionable suggestions** that reference the candidate's ACTUAL experience. Tell them HOW to reword or reframe existing bullet points, not just "add keyword X."

4. **Write a concise overall fit summary** (2-3 sentences).

Return ONLY valid JSON. No markdown fences. No commentary outside the JSON.

Required JSON structure:
{{
  "categories": [
    {{
      "name": "Technical Skills",
      "matched": ["React", "TypeScript", ...],
      "missing": ["Postgres", ...],
      "score": 75
    }},
    {{
      "name": "Soft Skills & Culture",
      "matched": [...],
      "missing": [...],
      "score": 80
    }},
    {{
      "name": "Experience & Seniority",
      "matched": [...],
      "missing": [...],
      "score": 60
    }},
    {{
      "name": "Domain Knowledge",
      "matched": [...],
      "missing": [...],
      "score": 50
    }}
  ],
  "suggestions": [
    {{
      "priority": "high",
      "category": "Technical Skills",
      "title": "Short actionable title",
      "detail": "Specific advice referencing the candidate's actual resume content. For example: 'Your Microsoft internship mentions Redis caching — reframe this to highlight backend infrastructure experience, which Notion values.'"
    }}
  ],
  "semantic_score": 85,
  "summary": "2-3 sentence overall fit assessment.",
  "all_matched_keywords": ["React", "TypeScript", ...],
  "all_missing_keywords": ["Postgres", "CI/CD", ...]
}}

- Include exactly 4 categories (Technical Skills, Soft Skills & Culture, Experience & Seniority, Domain Knowledge).
- Each category score is 0-100 based on how well the resume covers that category's requirements.
- Include a "semantic_score" from 0 to 100 representing how well the overall narrative and experience contextually aligns with the job, beyond just keyword matching.
- Provide 4-8 suggestions, ordered by priority (high first, then medium, then low).
- Suggestions must be specific to THIS resume and THIS job description — never generic.
- all_matched_keywords and all_missing_keywords should contain the union of matched/missing across categories (deduplicated).

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}
"""


def _run_gemini_analysis(resume_text: str, job_description: str) -> dict:
    """Calls Gemini to produce structured ATS analysis."""
    client = get_gemini_model()

    prompt = _ANALYSIS_PROMPT.format(
        resume_text=resume_text,
        job_description=job_description,
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    raw = response.text.strip()

    # Strip markdown code fences if present
    if raw.startswith("```json"):
        raw = raw[7:]
    elif raw.startswith("```"):
        raw = raw[3:]
    if raw.endswith("```"):
        raw = raw[:-3]

    return json.loads(raw.strip())

# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def calculate_ats_score(resume_text: str, job_description: str) -> dict:
    """Full ATS analysis using Gemini AI insights.

    Returns a dict with:
      - ats_score, semantic_score, keyword_match_score (numeric)
      - matching_keywords, missing_keywords (flat lists — backward compat)
      - categories (detailed per-category breakdown)
      - suggestions (actionable, prioritized)
      - summary (AI-generated fit assessment)
    """
    try:
        analysis = _run_gemini_analysis(resume_text, job_description)
    except Exception as e:
        print(f"[ATS] Gemini analysis failed: {e}")
        return {
            "ats_score": 0,
            "semantic_score": 0,
            "keyword_match_score": 0,
            "matching_keywords": [],
            "missing_keywords": [],
            "categories": [],
            "suggestions": [],
            "summary": "AI analysis unavailable.",
        }

    categories = analysis.get("categories", [])
    category_scores = [c.get("score", 0) for c in categories]
    keyword_match_score = round(sum(category_scores) / max(len(category_scores), 1), 2)
    semantic_score = analysis.get("semantic_score", keyword_match_score)

    ats_score = round(0.4 * keyword_match_score + 0.6 * semantic_score, 2)

    return {
        "ats_score": ats_score,
        "semantic_score": semantic_score,
        "keyword_match_score": keyword_match_score,
        "matching_keywords": analysis.get("all_matched_keywords", []),
        "missing_keywords": analysis.get("all_missing_keywords", []),
        "categories": categories,
        "suggestions": analysis.get("suggestions", []),
        "summary": analysis.get("summary", ""),
    }
