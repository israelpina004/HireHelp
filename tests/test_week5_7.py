import sys
import os
import json
import unittest
from flask import Flask

# Add backend to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

from app import create_app

class TestWeek5_7(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app.testing = True
        
    def test_ats_optimization(self):
        """Test the ATS optimization endpoint returns enriched AI analysis."""
        payload = {
            "resume_text": "Experienced software engineer with Python and React skills. Built REST APIs with Flask and deployed to AWS.",
            "job_description": "We are looking for a software engineer who knows Python, Flask, and has experience with distributed systems and CI/CD."
        }
        response = self.client.post('/api/ats/optimize', 
                                  data=json.dumps(payload),
                                  content_type='application/json')
        
        data = response.get_json()
        if response.status_code != 200:
            print(f"ATS Optimization Failed: {data}")
        
        self.assertEqual(response.status_code, 200)

        # Backward-compatible fields
        self.assertIn("ats_score", data)
        self.assertIn("semantic_score", data)
        self.assertIn("keyword_match_score", data)
        self.assertIn("missing_keywords", data)
        self.assertIn("matching_keywords", data)

        # New enriched fields
        self.assertIn("categories", data)
        self.assertIn("suggestions", data)
        self.assertIn("summary", data)
        self.assertIsInstance(data["categories"], list)
        self.assertIsInstance(data["suggestions"], list)
        self.assertIsInstance(data["summary"], str)

        # Validate category structure
        if data["categories"]:
            cat = data["categories"][0]
            self.assertIn("name", cat)
            self.assertIn("matched", cat)
            self.assertIn("missing", cat)
            self.assertIn("score", cat)

        # Validate suggestion structure
        if data["suggestions"]:
            sug = data["suggestions"][0]
            self.assertIn("priority", sug)
            self.assertIn("title", sug)
            self.assertIn("detail", sug)
        
        print("\n[ATS Optimization Test]")
        print(f"ATS Score: {data['ats_score']}")
        print(f"Summary: {data['summary']}")
        print(f"Categories: {len(data['categories'])}")
        print(f"Suggestions: {len(data['suggestions'])}")
        
    def test_bias_detection(self):
        """Test the Bias Detection endpoint"""
        # Test with neutral text
        neutral_payload = {"text": "The candidate should have 5 years of experience."}
        response_neutral = self.client.post('/api/ats/bias-check',
                                          data=json.dumps(neutral_payload),
                                          content_type='application/json')
        data_neutral = response_neutral.get_json()
        self.assertEqual(response_neutral.status_code, 200)
        self.assertFalse(data_neutral['bias_detected'])
        
        # Test with potentially biased text (using age bias example)
        # Note: Models might vary, but "young and energetic" is a classic example
        biased_payload = {"text": "We need a young, energetic guy for this role."}
        response_biased = self.client.post('/api/ats/bias-check',
                                         data=json.dumps(biased_payload),
                                         content_type='application/json')
        data_biased = response_biased.get_json()
        
        self.assertEqual(response_biased.status_code, 200)
        
        print("\n[Bias Detection Test]")
        print(f"Text: '{biased_payload['text']}'")
        print(f"Bias Detected: {data_biased['bias_detected']}")
        print(f"Inclusivity Score: {data_biased['inclusivity_score']}")
        if data_biased['bias_detected']:
            print(f"Details: {data_biased['details']}")

if __name__ == '__main__':
    with open('test_result.txt', 'w') as f:
        runner = unittest.TextTestRunner(stream=f, verbosity=2)
        unittest.main(testRunner=runner)
