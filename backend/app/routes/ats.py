from flask import Blueprint, request, jsonify, send_file
from app.services.ats_optimizer import calculate_ats_score
from app.services.bias_detector import detect_bias
from app.services.resume_rewriter import rewrite_resume
from app.services.pdf_exporter import generate_pdf, structured_to_plain_text

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


@ats_bp.route('/rewrite', methods=['POST'])
def rewrite_and_export():
    """Applies selected ATS suggestions via AI rewrite, returns rewritten text for grading."""
    data = request.get_json()
    resume_text = data.get('resume_text')
    job_description = data.get('job_description')
    selected_suggestions = data.get('selected_suggestions', [])
    ats_analysis = data.get('ats_analysis', {})

    if not resume_text or not job_description:
        return jsonify({"error": "Missing resume_text or job_description"}), 400

    if not selected_suggestions:
        return jsonify({"error": "No suggestions selected"}), 400

    try:
        rewritten = rewrite_resume(
            resume_text=resume_text,
            job_description=job_description,
            selected_suggestions=selected_suggestions,
            ats_analysis=ats_analysis,
        )
        plain_text = structured_to_plain_text(rewritten)
        return jsonify({
            "rewritten_resume": rewritten,
            "rewritten_text": plain_text,
        })
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@ats_bp.route('/export-pdf', methods=['POST'])
def export_pdf():
    """Generates a PDF from structured resume JSON."""
    data = request.get_json()
    structured_resume = data.get('structured_resume')

    if not structured_resume:
        return jsonify({"error": "Missing structured_resume"}), 400

    try:
        pdf_buffer = generate_pdf(structured_resume)
        return send_file(
            pdf_buffer,
            mimetype="application/pdf",
            as_attachment=True,
            download_name="optimized_resume.pdf",
        )
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
