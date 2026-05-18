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
    target_count = data.get("target_count")
    focus = data.get("focus")

    if not job_description:
        return jsonify({"error": "Missing required field: job_description"}), 400

    if len(job_description) < 50:
        return jsonify({"error": "Job description is too short. Please provide at least 50 characters."}), 400

    if len(job_description) > 10000:
        return jsonify({"error": "Job description is too long. Please limit to 10,000 characters."}), 400

    # Validate optional fields
    if target_count is not None:
        try:
            target_count = int(target_count)
        except (TypeError, ValueError):
            return jsonify({"error": "target_count must be an integer."}), 400
        if target_count < 3 or target_count > 30:
            return jsonify({"error": "target_count must be between 3 and 30."}), 400

    if focus is not None and focus not in ("mixed", "behavioral", "technical", "situational"):
        return jsonify({"error": "focus must be one of: mixed, behavioral, technical, situational."}), 400

    try:
        result = generate_interview_questions(
            job_description,
            target_count=target_count,
            focus=focus,
        )
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
