import json
from app.utils.gemini_client import get_gemini_model

COMPETENCY_AREAS = [
    "Leadership",
    "Communication",
    "Problem Solving",
    "Teamwork & Collaboration",
    "Adaptability",
    "Technical Skills",
    "Time Management & Prioritization",
]

STAR_GUIDANCE = {
    "description": (
        "The STAR method is a structured way to answer behavioral interview questions. "
        "Use each component to build a clear, concise story."
    ),
    "components": [
        {
            "label": "S — Situation",
            "guidance": "Set the scene. Describe the context and background of the situation you were in.",
            "example": "\"In my previous internship, our team was tasked with delivering a feature under a tight two-week deadline...\"",
        },
        {
            "label": "T — Task",
            "guidance": "Explain your specific responsibility or what was expected of you.",
            "example": "\"As the only backend developer on the team, I was responsible for designing the API and integrating it with the frontend...\"",
        },
        {
            "label": "A — Action",
            "guidance": "Describe the exact steps YOU took. Focus on your individual contribution, not the team's.",
            "example": "\"I broke the work into daily milestones, set up automated tests, and communicated blockers to my manager early...\"",
        },
        {
            "label": "R — Result",
            "guidance": "Share the outcome. Use numbers or metrics when possible. What did you learn?",
            "example": "\"We shipped on time, the feature had zero critical bugs in the first sprint, and I was asked to lead the next module.\"",
        },
    ],
    "tips": [
        "Keep your answer to 2-3 minutes — practice out loud.",
        "Always end on a positive result or lesson learned.",
        "Avoid vague language like 'we did' — say 'I did'.",
        "Prepare 5-6 strong STAR stories that can adapt to different questions.",
    ],
}


def generate_interview_questions(job_description: str) -> dict:
    """
    Uses Gemini to analyze a job description and generate behavioral interview
    questions organized by competency area.
    """
    client = get_gemini_model()

    competency_list = ", ".join(COMPETENCY_AREAS)

    prompt = f"""
You are an expert career coach and interview preparation specialist.

Analyze the job description below and generate a set of tailored behavioral interview questions.
Organize questions into the following competency areas: {competency_list}.

For each competency, generate 2-4 questions that are specifically relevant to the job description.
Assign a difficulty to each question: "easy", "medium", or "hard".

Return ONLY valid JSON. Do not include markdown formatting or code fences.

Required JSON Structure:
{{
  "job_title": "string (inferred from JD, or 'Not specified')",
  "competencies": [
    {{
      "name": "string (competency area name)",
      "description": "string (1 sentence: why this competency matters for this role)",
      "questions": [
        {{
          "id": "string (unique, e.g. 'leadership_1')",
          "question": "string (full behavioral question starting with 'Tell me about a time...' or similar)",
          "why_asked": "string (1 sentence: what the interviewer is looking for)",
          "difficulty": "easy | medium | hard"
        }}
      ]
    }}
  ]
}}

Only include competencies that are actually relevant to the job description.
Skip a competency entirely if the JD provides no signal for it.

JOB DESCRIPTION:
{job_description}
"""

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

    parsed = json.loads(raw.strip())
    return parsed


def get_competency_areas() -> dict:
    """Returns the static list of competency areas and STAR guidance."""
    return {
        "competency_areas": COMPETENCY_AREAS,
        "star_guidance": STAR_GUIDANCE,
    }
