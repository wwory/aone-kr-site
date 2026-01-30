from flask import render_template
from app.blueprints.pr import bp

@bp.route('/')
def pr():
    return render_template('pages/pr.html')
