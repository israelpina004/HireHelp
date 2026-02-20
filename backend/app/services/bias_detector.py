from transformers import pipeline

# Load model for zero-shot classification to detect specific types of bias
# 'facebook/bart-large-mnli' is standard but can be heavy. 
# We use a smaller distilbart model for speed if available, or stay with bart-large-mnli for quality.
# For this demo, we'll use a specific bias detection model or zero-shot.
# Using 'valhalla/distilbart-mnli-12-3' for a good balance.
try:
    classifier = pipeline("zero-shot-classification", model="valhalla/distilbart-mnli-12-3")
except Exception as e:
    print(f"Error loading Bias Detector: {e}")
    classifier = None

def detect_bias(text: str) -> dict:
    """
    Analyzes text for potential biases using a zero-shot classification model.
    Categories: Age, Gender, Racial/Ethnic, Socioeconomic.
    """
    if not classifier or not text:
        return {"bias_detected": False, "details": []}

    candidate_labels = ["age bias", "gender bias", "racial bias", "socioeconomic bias", "neutral"]
    
    # We can split text into sentences for more granular feedback
    # For now, we process the whole block to get an overall sentiment
    # But ideally, we should check sentence by sentence.
    
    results = classifier(text, candidate_labels, multi_label=True)
    
    detected_biases = []
    scores = dict(zip(results['labels'], results['scores']))
    
    threshold = 0.5  # Confidence threshold
    
    for label, score in scores.items():
        if label != "neutral" and score > threshold:
            detected_biases.append({
                "type": label,
                "confidence": round(score, 2),
                "suggestion": f"Consider rephrasing to remove potential {label}."
            })
            
    is_biased = len(detected_biases) > 0
    
    return {
        "bias_detected": is_biased,
        "inclusivity_score": 100 - (len(detected_biases) * 20), # Simple heuristic
        "details": detected_biases
    }

def analyze_job_description_bias(text: str) -> dict:
    # Wrapper for more detailed report suitable for creating a "bias-free testing mode"
    return detect_bias(text)
