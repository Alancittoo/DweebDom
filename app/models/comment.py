from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)

    comment_users_relationship = db.relationship('User', back_populates='user_comments_relationship')#done
    comment_pins_relationship = db.relationship('Pin', back_populates='pin_comments_relationship')#done

    def to_dict(self):
        return {
        'id': self.id,
        'comment': self.comment,
        'user_id': self.user_id,
        'pin_id': self.pin_id
    }

    def to_dict_no_item(self):
        return {
        'id': self.id,
        'comment': self.comment,
    }
