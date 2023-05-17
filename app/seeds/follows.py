# from app.models import db, follows, environment, SCHEMA
# from sqlalchemy.sql import text, insert

# def seed_follows():
#     follows_insert = insert(follows)
#     data = [
#         {'follower_id': 1, 'followed_id': 2},
#         {'follower_id': 1, 'followed_id': 3},
#         {'follower_id': 3, 'followed_id': 2},
#         {'follower_id': 2, 'followed_id': 1},
#     ]

#     # db.session.add(follow1)
#     # db.session.add(follow2)
#     # db.session.add(follow3)
#     # db.session.add(follow4)

#     db.session.execute(follows_insert, data)

#     db.session.commit()

# def undo_follows():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM follows"))

#     db.session.commit()
