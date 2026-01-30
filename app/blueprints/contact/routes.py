from flask import render_template
from app.blueprints.contact import bp

@bp.route('/')
def contact():
    return render_template('pages/contact.html')
