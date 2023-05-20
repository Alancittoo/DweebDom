from .db import db, environment, SCHEMA, add_prefix_for_prod

class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    pin_users_relationship = db.relationship('User', back_populates='user_pins_relationship') #done
    pin_comments_relationship = db.relationship('Comment', back_populates='comment_pins_relationship',  cascade='delete')#done
    pin_likes_relationship = db.relationship('Like', back_populates='like_pins_relationship',  cascade='delete')#done

    #ASSOCIATION
    pin_boards_association = db.relationship('Board',
        secondary='board_pins',
        back_populates='board_pins_association'
        )

    pin_tags_association = db.relationship('Tag',
        secondary='pin_tags',
        back_populates='tag_pins_association'
        )

    def to_dict(self):
        return {
        'id': self.id,
        'image_url': self.image_url,
        'title': self.title,
        'description': self.description,
        'user_id': self.user_id,
    }

    def to_dict_no_item(self):
        return {
        'id': self.id,
        'image_url': self.image_url,
        'title': self.title,
        'description': self.description,

    }
