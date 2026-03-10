import sys
import os
import json
from flask import Flask

# Add backend to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend')))

from app import create_app

app = create_app()
client = app.test_client()

payload = {
    "resume_text": "Experienced software engineer with Python and React skills.",
    "job_description": "We are looking for a software engineer who knows Python and Flask."
}

response = client.post('/api/ats/optimize', 
                      data=json.dumps(payload),
                      content_type='application/json')

print(f"Status Code: {response.status_code}")
print(f"Response Body: {response.get_data(as_text=True)}")
