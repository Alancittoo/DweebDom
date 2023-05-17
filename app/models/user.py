from .db import db, environment, SCHEMA, add_prefix_for_prod
from .follows import follows
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String, nullable=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)

    # Regular relationships, gotta do the other models first
    user_boards_relationship = db.relationship('Board', back_populates='board_users_relationship') #done
    user_pins_relationship = db.relationship('Pin', back_populates='pin_users_relationship') #done
    user_comments_relationship = db.relationship('Comment', back_populates='comment_users_relationship') #done
    user_likes_relationship = db.relationship('Like', back_populates='like_users_relationship') #done

    # Asscociation
    # followed = db.relationship(
    #     'User', secondary='follows', primaryjoin=(follows.c.follower_id == id), secondaryjoin=(follows.c.followed_id == id), foreign_keys=[follows.c.follower_id, follows.c.followed_id], back_populates='followers'
    # )

    # followers = db.relationship(
    #     'User', secondary='follows', primaryjoin=(follows.c.followed_id == id), secondaryjoin=(follows.c.follower_id == id), foreign_keys=[follows.c.followed_id, follows.c.follower_id], back_populates='followed'
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_picture': self.profile_picture,
            'first_name': self.first_name,
            'last_name': self.last_name
        }
