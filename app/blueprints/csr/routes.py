from flask import render_template
from app.blueprints.csr import bp

@bp.route('/')
def csr():
    return render_template('pages/csr.html')
