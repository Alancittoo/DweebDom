from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pin.id')), nullable=False)

    like_users_relationship = db.relationship('User', back_populates='user_likes_relationship')#done
    like_pins_relationship = db.relationship('Pin', back_populates='pin_likes_relationship')#done

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'pin_id': self.pin_id
    }
