from flask import Flask
from app.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Blueprint 등록
    from app.blueprints.main import bp as main_bp
    from app.blueprints.company import bp as company_bp
    from app.blueprints.brand import bp as brand_bp
    from app.blueprints.csr import bp as csr_bp
    from app.blueprints.contact import bp as contact_bp
    from app.blueprints.pr import bp as pr_bp
    from app.blueprints.recruit import bp as recruit_bp
    
    app.register_blueprint(main_bp)
    app.register_blueprint(company_bp, url_prefix='/company')
    app.register_blueprint(brand_bp, url_prefix='/brand')
    app.register_blueprint(csr_bp, url_prefix='/csr')
    app.register_blueprint(contact_bp, url_prefix='/contact')
    app.register_blueprint(pr_bp, url_prefix='/pr')
    app.register_blueprint(recruit_bp, url_prefix='/recruit')
    
    return app
