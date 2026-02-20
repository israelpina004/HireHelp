from flask import Blueprint, request, jsonify
from app.services.ats_optimizer import calculate_ats_score, extract_keywords
from app.services.bias_detector import detect_bias

ats_bp = Blueprint('ats', __name__)

@ats_bp.route('/optimize', methods=['POST'])
def optimize_resume():
    data = request.get_json()
    resume_text = data.get('resume_text')
    job_description = data.get('job_description')
    
    if not resume_text or not job_description:
        return jsonify({"error": "Missing resume_text or job_description"}), 400
        
    try:
        result = calculate_ats_score(resume_text, job_description)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@ats_bp.route('/keywords', methods=['POST'])
def get_keywords():
    data = request.get_json()
    text = data.get('text')
    
    if not text:
        return jsonify({"error": "Missing text"}), 400
        
    try:
        keywords = extract_keywords(text)
        return jsonify({"keywords": keywords})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@ats_bp.route('/bias-check', methods=['POST'])
def check_bias():
    data = request.get_json()
    text = data.get('text')
    
    if not text:
        return jsonify({"error": "Missing text"}), 400
        
    try:
        result = detect_bias(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
