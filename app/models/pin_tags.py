from .db import db, environment, SCHEMA, add_prefix_for_prod

pin_tags = db.Table('pin_tags',
    db.Column('tag_id', db.Integer, db.ForiegnKey(add_prefix_for_prod('tags.id')), primary_key=True),
    db.Column('pin_id', db.Integer, db.ForiegnKey(add_prefix_for_prod('pins.id')), primary_key=True)
    )

if environment == 'production':
    pin_tags.schema = {'schema': SCHEMA}
