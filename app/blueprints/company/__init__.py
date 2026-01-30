from flask import Blueprint

bp = Blueprint('company', __name__)

from app.blueprints.company import routes
