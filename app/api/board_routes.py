from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Board, board_pins, db
from ..forms.board_form import BoardForm

board_routes = Blueprint('boards', __name__)

@board_routes.route('/allBoards/<int:user_id>')
@login_required
def current_user_boards(user_id):
    # user = current_user.id
    boards = current_user.user_boards_relationship
    return jsonify([board.to_dict() for board in boards])

@board_routes.route('/<int:board_id>')
@login_required
def single_user_board(board_id):
    board = Board.query.get(board_id)
    # only owner can view their board if not public
    if board:
        if board.is_public or board.user_id == current_user.id:
            return board.to_dict()
        else:
            return {"errors": "Unauthorized"}, 403
    else:
        return {"errors": "Board not found"}, 404

@board_routes.route('/createBoard', methods=['POST'])
@login_required
def create_board():
    user = current_user

    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_board = Board(
            title = form.data['title'],
            description = form.data['description'],
            is_public = form.data['is_public'],
            user_id = user.id
        )
        db.session.add(new_board)
        db.session.commit()
        return new_board.to_dict()
    else:
        return {'ERRORS': form.errors}


@board_routes.route('/<int:board_id>', methods=['PUT'])
@login_required
def update_board(board_id):
    board = Board.query.get(board_id)

    if not board:
        return {"error": "No Board Found"}
    if board.user_id != current_user.id:
        return {"error": "You are not Authorized to edit this item"}

    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        board.title = form.data['title']
        board.description = form.data['description']
        board.is_public = form.data['is_public']

        # db.session.add(board)
        db.session.commit()
        return board.to_dict(), 201
    else:
        return form.errors

@board_routes.route('/delete/<int:board_id>', methods=['DELETE'])
@login_required
def delete_board(board_id):
    board = Board.query.get(board_id)

    if not board:
        return {"error": "No Board Found"}, 404
    if board.user_id != current_user.id:
        return {"error": "You are not Authorized to delete this item"}, 400

    db.session.delete(board)
    db.session.commit()
    return {'message': "BOARD DELETED"}, 200