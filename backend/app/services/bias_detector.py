import json
from app.utils.gemini_client import get_gemini_model

_BIAS_PROMPT = """Analyze the following text for potential biases.
Categories to check: Age, Gender, Racial/Ethnic, Socioeconomic.

Return ONLY valid JSON.
Format:
{{
  "bias_detected": boolean,
  "inclusivity_score": number (0-100),
  "details": [
    {{
      "type": "age bias",
      "confidence": 0.95,
      "suggestion": "Consider rephrasing..."
    }}
  ]
}}

TEXT:
{text}
"""

def detect_bias(text: str) -> dict:
    """
    Analyzes text for potential biases using Gemini AI.
    Categories: Age, Gender, Racial/Ethnic, Socioeconomic.
    """
    if not text:
        return {"bias_detected": False, "inclusivity_score": 100, "details": []}

    try:
        client = get_gemini_model()
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=_BIAS_PROMPT.format(text=text)
        )
        
        raw = response.text.strip()
        if raw.startswith("```json"):
            raw = raw[7:]
        elif raw.startswith("```"):
            raw = raw[3:]
        if raw.endswith("```"):
            raw = raw[:-3]
            
        return json.loads(raw.strip())
    except Exception as e:
        print(f"Error in Gemini bias detection: {e}")
        return {"bias_detected": False, "inclusivity_score": 100, "details": []}

def analyze_job_description_bias(text: str) -> dict:
    # Wrapper for more detailed report suitable for creating a "bias-free testing mode"
    return detect_bias(text)
