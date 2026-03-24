"""Resume Rewriter Service — ATS-score-driven Gemini rewrite.

Takes the original resume text, job description, full ATS analysis
(categories, missing keywords, scores), and selected suggestions to
produce a rewritten resume that directly targets higher ATS scores.
"""

import json
from app.utils.gemini_client import get_gemini_model


_REWRITE_PROMPT = """You are a world-class resume optimization engine. Your SOLE OBJECTIVE is to produce a resume that will score 85%+ on ATS keyword matching against the job description below.

## CRITICAL STRATEGY — MAXIMIZE ATS SCORE
ATS systems score resumes by matching keywords, skills, and phrases from the job description. To maximize the score you MUST:

1. **MIRROR THE JOB DESCRIPTION'S EXACT LANGUAGE** — Use the SAME terms, phrases, and skill names that appear in the JD. If the JD says "CI/CD pipelines", write "CI/CD pipelines", not "continuous integration". If the JD says "cross-functional collaboration", use that exact phrase.

2. **INTEGRATE EVERY MISSING KEYWORD** listed below into the resume. Each missing keyword MUST appear at least once in the output. Place them in the most relevant section:
   - Technical skills → Skills section AND in experience bullet points where context fits
   - Soft skills → Summary AND experience bullets
   - Domain terms → Summary, experience, or projects
   - Tool/platform names → Skills section AND relevant experience bullets

3. **ADD A DEDICATED SKILLS SECTION** that lists ALL keywords from the JD — both matched and missing. Group them logically (e.g. "Languages:", "Frameworks:", "Tools:", "Cloud:", "Methodologies:"). This is the single most impactful change for ATS scoring.

4. **REWRITE EVERY EXPERIENCE BULLET** to naturally incorporate JD keywords. Transform generic descriptions into keyword-rich, impact-driven statements. Example:
   - BEFORE: "Worked on backend features"
   - AFTER: "Engineered scalable RESTful APIs using Python and FastAPI, implementing CI/CD pipelines for automated testing and deployment to AWS"

5. **WRITE A TAILORED PROFESSIONAL SUMMARY** (3-4 sentences) that contains 8-12 keywords from the JD. This summary should read like a direct response to the job posting.

6. **PRESERVE ALL FACTUAL INFORMATION** — company names, job titles, dates, degrees. You may reframe and expand descriptions but NEVER fabricate employers, roles, or credentials.

7. **FOR SKILLS THE CANDIDATE LIKELY HAS** based on their experience context (e.g., a backend engineer likely knows SQL even if not listed), add them to the Skills section. For truly unfamiliar skills, add under "Exposure" or "Familiar With" subsection.

8. **QUANTIFY EVERYTHING POSSIBLE** — Add metrics, percentages, and scale. "Improved performance" → "Improved API response time by 40% serving 10K+ daily active users".

## ATS ANALYSIS — CURRENT SCORES (YOU MUST IMPROVE ALL OF THESE)
{categories_json}

## MISSING KEYWORDS — EVERY ONE MUST APPEAR IN THE OUTPUT
{missing_keywords}

## MATCHED KEYWORDS — KEEP ALL OF THESE (DO NOT REMOVE ANY)
{matched_keywords}

## SELECTED SUGGESTIONS TO APPLY
{suggestions_json}

## ORIGINAL RESUME
{resume_text}

## JOB DESCRIPTION
{job_description}

## OUTPUT FORMAT
Return ONLY valid JSON. No markdown fences. No commentary.

{{
  "contact_info": {{
    "name": "string",
    "email": "string",
    "phone": "string",
    "linkedin": "string (optional)",
    "location": "string (optional)"
  }},
  "summary": "3-4 sentence professional summary PACKED with JD keywords",
  "experience": [
    {{
      "company": "string",
      "title": "string",
      "start_date": "string",
      "end_date": "string",
      "bullets": ["Keyword-rich, impact-driven bullet point", "..."]
    }}
  ],
  "education": [
    {{
      "institution": "string",
      "degree": "string",
      "start_year": "string",
      "end_year": "string",
      "details": "string (optional — honors, relevant coursework with JD-relevant subjects)"
    }}
  ],
  "skills": ["Languages: Python, TypeScript, Go", "Frameworks: React, FastAPI, Django", "Cloud: AWS, GCP", "Tools: Docker, Kubernetes, CI/CD"],
  "projects": [
    {{
      "name": "string",
      "description": "Keyword-rich rewritten project description",
      "url": "string (optional)"
    }}
  ]
}}

REMEMBER: Your #1 priority is that EVERY missing keyword appears in the output and EVERY matched keyword is retained. The skills section alone should contain 80%+ of all JD keywords.
"""


def rewrite_resume(
    resume_text: str,
    job_description: str,
    selected_suggestions: list[dict],
    ats_analysis: dict,
) -> dict:
    """Rewrites a resume to maximize ATS score.

    Args:
        resume_text: The original raw resume text.
        job_description: The target job description.
        selected_suggestions: List of suggestion dicts the user chose to apply.
        ats_analysis: The full ATS analysis result (categories, keywords, scores).

    Returns:
        A structured dict of the rewritten resume sections.

    Raises:
        ValueError: If resume_text or job_description is empty.
        RuntimeError: If Gemini response cannot be parsed.
    """
    if not resume_text or not job_description:
        raise ValueError("resume_text and job_description are required")

    categories = ats_analysis.get("categories", [])
    missing_keywords = ats_analysis.get("missing_keywords", [])
    matched_keywords = ats_analysis.get("matching_keywords", [])

    prompt = _REWRITE_PROMPT.format(
        resume_text=resume_text,
        job_description=job_description,
        categories_json=json.dumps(categories, indent=2),
        missing_keywords=", ".join(missing_keywords) if missing_keywords else "(none)",
        matched_keywords=", ".join(matched_keywords) if matched_keywords else "(none)",
        suggestions_json=json.dumps(selected_suggestions, indent=2),
    )

    client = get_gemini_model()
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    raw = response.text.strip()

    if raw.startswith("```json"):
        raw = raw[7:]
    elif raw.startswith("```"):
        raw = raw[3:]
    if raw.endswith("```"):
        raw = raw[:-3]

    try:
        return json.loads(raw.strip())
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Failed to parse Gemini rewrite response: {exc}") from exc
