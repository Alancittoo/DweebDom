from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
    tag1 = Tag (
        name = 'Anime'
    )
    tag2 = Tag (
        name = 'Random'
    )
    tag3 = Tag (
        name = 'Pets'
    )
    tag4 = Tag (
        name = 'Food'
    )
    tag5 = Tag (
        name = 'Clothing'
    )
    tag6 = Tag (
        name = 'Music'
    )
    tag7 = Tag (
        name = 'Gaming'
    )

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)

    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
