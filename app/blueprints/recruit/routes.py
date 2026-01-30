from flask import render_template
from app.blueprints.recruit import bp

@bp.route('/')
def recruit():
    return render_template('pages/recruit.html')
