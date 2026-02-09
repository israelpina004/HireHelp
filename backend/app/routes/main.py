from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__)

@main_bp.route('/health')
def health():
    return jsonify({"status": "ok", "service": "HireHelp Backend"})

@main_bp.route('/')
def index():
    return jsonify({"message": "Welcome to HireHelp API"})
