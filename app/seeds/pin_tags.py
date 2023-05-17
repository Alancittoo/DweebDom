from app.models import db, environment, SCHEMA, pin_tags
from sqlalchemy.sql import text, insert

def seed_pin_tags():
    pin_tags_insert = insert(pin_tags)

    data = [
        {'tag_id': 1, 'pin_id': 1},
        {'tag_id': 2, 'pin_id': 2},
        {'tag_id': 3, 'pin_id': 3}
    ]

    # db.session.add(pin_tag1)
    # db.session.add(pin_tag2)
    # db.session.add(pin_tag3)

    db.session.execute(pin_tags_insert, data)

    db.session.commit()

def undo_pin_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pin_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pin_tags"))

    db.session.commit()
