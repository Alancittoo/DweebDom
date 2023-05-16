from .db import db, environment, SCHEMA, add_prefix_for_prod

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    is_public = db.Column(db.Boolean, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    board_users_relationship = db.relationship('User', back_populates='user_boards_relationship') #done

    #ASSOCIATION
    board_pins_association = db.relationship('Pin',
        secondary='board_pins',
        back_populates='pin_boards_association')


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'is_public': self.is_public,
            'user_id': self.user_id
        }

    def to_dict_no_item(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'is_public': self.is_public,
        }
