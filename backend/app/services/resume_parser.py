import fitz
import json
from app.utils.gemini_client import get_gemini_model

def extract_text_from_pdf(file_stream) -> str:
    # Extracts text from a PDF file stream.
    doc = fitz.open(stream=file_stream, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def parse_resume(text: str) -> dict:
    # Uses Gemini to parse a resume text and extract relevant information.
    client = get_gemini_model()
    
    prompt = f"""
    You are an expert AI Resume Parser. 
    Extract the following information from the resume text provided below.
    Return ONLY valid JSON. Do not include markdown formatting like ```json ... ```.
    
    Required JSON Structure:
    {{
        "contact_info": {{
            "name": "string",
            "email": "string",
            "phone": "string",
            "linkedin": "string",
            "location": "string"
        }},
        "education": [
            {{
                "institution": "string",
                "degree": "string",
                "start_year": "string",
                "end_year": "string"
            }}
        ],
        "experience": [
            {{
                "company": "string",
                "title": "string",
                "start_date": "string",
                "end_date": "string",
                "description": "string (summarized bullet points)"
            }}
        ],
        "projects": [
            {{
                "name": "string",
                "description": "string",
                "url": "string"
            }}
        ],
        "skills": ["string", "string"]
    }}
    RESUME TEXT:
    {text}
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt
    )
    clean_json = response.text.strip()
    
    # Remove markdown formatting if present
    if clean_json.startswith("```json"):
        clean_json = clean_json[7:]
    elif clean_json.startswith("```"):
        clean_json = clean_json[3:]
    if clean_json.endswith("```"):
        clean_json = clean_json[:-3]
    
    clean_json = clean_json.strip()
    return json.loads(clean_json)
        
