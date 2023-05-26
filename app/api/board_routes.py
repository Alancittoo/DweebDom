from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Board, board_pins, db, Pin
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

@board_routes.route('/<int:board_id>/pins/<int:pin_id>', methods=['POST'])
@login_required
def adding_pin(board_id, pin_id):
    board = Board.query.get(board_id)
    if not board or board.user_id != current_user.id:
        return {"error": "NOT ALLOWED"}

    pin = Pin.query.get(pin_id)
    if not pin:
        return {"error": "CANNOT FIND PIN"}

    pin_exists = db.session.query(board_pins).filter(
        board_pins.c.board_id == board.id,
        board_pins.c.pin_id == pin.id
    ).first()

    if pin_exists:
        return {"error": "This pin already exists for the board silly"}

    board.board_pins_association.append(pin)
    db.session.commit()
    return board.to_dict()

@board_routes.route('/<int:board_id>/pins/<int:pin_id>', methods=['DELETE'])
@login_required
def deleting_pin(board_id, pin_id):
    board = Board.query.get(board_id)
    if not board or board.user_id != current_user.id:
        return {"error": "NOT ALLOWED"}

    pin = Pin.query.get(pin_id)
    if not pin:
        return {"error": "CANNOT FIND PIN"}

    board.board_pins_association.remove(pin)
    db.session.commit()
    return board.to_dict()
