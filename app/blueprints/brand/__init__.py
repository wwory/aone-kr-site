from flask import Blueprint

bp = Blueprint('brand', __name__)

from app.blueprints.brand import routes
