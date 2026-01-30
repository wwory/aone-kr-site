from flask import Blueprint

bp = Blueprint('recruit', __name__)

from app.blueprints.recruit import routes
