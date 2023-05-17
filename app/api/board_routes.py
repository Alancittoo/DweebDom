from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Board, board_pins, db

board_routes = Blueprint('boards', __name__)

@board_routes.route('/current/<int:user_id>')
@login_required
def current_user_board(user_id):
    pass
