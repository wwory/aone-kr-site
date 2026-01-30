from flask import render_template
from app.blueprints.company import bp

@bp.route('/')
def company():
    return render_template('pages/company.html')
