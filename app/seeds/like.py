from app.models import db, environment, SCHEMA, Like
from sqlalchemy.sql import text
def seed_like():
    like1 = Like(
        user_id = 1,
        pin_id = 2
    )
    like2 = Like(
        user_id = 1,
        pin_id = 4
    )
    like3 = Like(
        user_id = 1,
        pin_id = 5
    )
    like4 = Like(
        user_id = 1,
        pin_id = 7
    )
    like5 = Like(
        user_id = 1,
        pin_id = 8
    )
    like6 = Like(
        user_id = 2,
        pin_id = 2
    )
    like7 = Like(
        user_id = 2,
        pin_id = 21
    )
    like8 = Like(
        user_id = 2,
        pin_id = 12
    )
    like9 = Like(
        user_id = 2,
        pin_id = 16
    )
    like10 = Like(
        user_id = 2,
        pin_id = 10
    )
    like11 = Like(
        user_id = 3,
        pin_id = 5
    )
    like12 = Like(
        user_id = 3,
        pin_id = 8
    )

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)

    db.session.commit()

def undo_like():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
