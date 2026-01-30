from flask import render_template
from app.blueprints.brand import bp

@bp.route('/')
def brand():
    return render_template('pages/brand.html')
