from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boards():
    board1 = Board(
        title = "Anime",
        description = 'Only the Hardest and Best Anime',
        user_id = 2
    )
    board2 = Board(
        title = "Music",
        description = 'Mango Music is the best',
        user_id = 1
    )
    board3 = Board(
        title = "Clothing",
        description = 'Clothes and stuff',
        user_id = 1
    )
    board4 = Board(
        title = "Gaming",
        description = 'Gaming stuff',
        user_id = 3
    )
    board5 = Board(
        title = "Foods",
        description = 'Something I might wanna try later',
        user_id = 3
    )
    board6 = Board(
        title = "Pets",
        description = 'Only cute animals',
        user_id = 3
    )

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board4)
    db.session.add(board5)
    db.session.add(board6)

    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
