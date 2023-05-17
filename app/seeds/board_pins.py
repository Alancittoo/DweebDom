from app.models import db, environment, SCHEMA, board_pins
from sqlalchemy.sql import text, insert

def seed_board_pins():
    board_pins_insert = insert(board_pins)

    data = [
        {'board_id': 1 , 'pin_id': 2},
        {'board_id': 1 , 'pin_id': 3},
        {'board_id': 1 , 'pin_id': 20},
        {'board_id': 1 , 'pin_id': 4},
        {'board_id': 1 , 'pin_id': 6},
        {'board_id': 1 , 'pin_id': 7},
        {'board_id': 2 , 'pin_id': 8},
        {'board_id': 2 , 'pin_id': 9},
        {'board_id': 2 , 'pin_id': 10},
        {'board_id': 2 , 'pin_id': 11},
        {'board_id': 2 , 'pin_id': 12},
        {'board_id': 2 , 'pin_id': 13},
        {'board_id': 3 , 'pin_id': 14},
        {'board_id': 3 , 'pin_id': 15},
        {'board_id': 3 , 'pin_id': 16},
        {'board_id': 3 , 'pin_id': 17},
        {'board_id': 3 , 'pin_id': 18},
        {'board_id': 3 , 'pin_id': 19},
        ]

    # db.session.add(board_pin1)
    # db.session.add(board_pin2)
    # db.session.add(board_pin3)
    # db.session.add(board_pin4)
    # db.session.add(board_pin5)
    # db.session.add(board_pin6)
    # db.session.add(board_pin7)
    # db.session.add(board_pin8)
    # db.session.add(board_pin9)
    # db.session.add(board_pin10)
    # db.session.add(board_pin11)
    # db.session.add(board_pin12)
    # db.session.add(board_pin13)
    # db.session.add(board_pin14)
    # db.session.add(board_pin15)
    # db.session.add(board_pin16)
    # db.session.add(board_pin17)
    # db.session.add(board_pin18)
    db.session.execute(board_pins_insert, data)

    db.session.commit()


def undo_board_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.board_pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM board_pins"))

    db.session.commit()
