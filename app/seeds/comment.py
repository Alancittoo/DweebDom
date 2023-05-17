from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        comment = 'Too Coool tbh',
        user_id = 1,
        pin_id = 6
    )
    comment2 = Comment(
        comment = 'We got stuff in common',
        user_id = 2,
        pin_id = 18
    )
    comment3 = Comment(
        comment = 'nerd',
        user_id = 1,
        pin_id = 9
    )
    comment4 = Comment(
        comment = 'This is awesome ngl',
        user_id = 2,
        pin_id = 6
    )
    comment5 = Comment(
        comment = 'what is this',
        user_id = 3,
        pin_id = 4
    )
    comment6 = Comment(
        comment = 'wowzerz',
        user_id = 3,
        pin_id = 2
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
