from flask import Blueprint, request, jsonify
from app.services.interview_service import generate_interview_questions, get_competency_areas

interview_bp = Blueprint("interview", __name__)


@interview_bp.route("/generate", methods=["POST"])
def generate_questions():
    """
    POST /api/interview/generate
    Body: { "job_description": "..." }
    Returns: competency-organized behavioral interview questions
    """
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400

    job_description = data.get("job_description", "").strip()

    if not job_description:
        return jsonify({"error": "Missing required field: job_description"}), 400

    if len(job_description) < 50:
        return jsonify({"error": "Job description is too short. Please provide at least 50 characters."}), 400

    if len(job_description) > 10000:
        return jsonify({"error": "Job description is too long. Please limit to 10,000 characters."}), 400

    try:
        result = generate_interview_questions(job_description)
        return jsonify(result), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 422
    except Exception as e:
        return jsonify({"error": f"Failed to generate questions: {str(e)}"}), 500


@interview_bp.route("/competencies", methods=["GET"])
def get_competencies():
    """
    GET /api/interview/competencies
    Returns: static list of competency areas and full STAR method guidance
    """
    try:
        result = get_competency_areas()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
