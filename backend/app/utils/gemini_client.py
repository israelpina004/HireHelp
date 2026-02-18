import os
import google.genai as genai

def get_gemini_model():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
        
    # Use a model optimized for text/json (e.g., gemini-1.5-flash for speed/cost)
    client = genai.Client(api_key=api_key)
    return client