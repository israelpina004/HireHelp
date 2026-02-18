from flask import Blueprint, request, jsonify
from app.services.resume_parser import extract_text_from_pdf, parse_resume

resume_parser_bp = Blueprint('resume_parser', __name__)

@resume_parser_bp.route('/upload', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    try:
        text = extract_text_from_pdf(file.read())
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    try:
        parsed_data = parse_resume(text)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify(parsed_data)
