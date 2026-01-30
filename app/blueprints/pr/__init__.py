from flask import Blueprint

bp = Blueprint('pr', __name__)

from app.blueprints.pr import routes
