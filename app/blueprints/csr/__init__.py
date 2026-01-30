from flask import Blueprint

bp = Blueprint('csr', __name__)

from app.blueprints.csr import routes
