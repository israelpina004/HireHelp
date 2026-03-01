from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    # <-- allow all origins for /api/* endpoints
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints
    from app.routes.main import main_bp
    from app.routes.resume_parser import resume_parser_bp
    from app.routes.ats import ats_bp
    from app.routes.interview import interview_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(resume_parser_bp, url_prefix='/api/resume_parser')
    app.register_blueprint(ats_bp, url_prefix='/api/ats')
    app.register_blueprint(interview_bp, url_prefix='/api/interview')

    return app
