from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField('Comment Field', validators=[DataRequired()])
    pin_id = IntegerField('pin_id')
    user_id = IntegerField('user_id')

class CommentUpdateForm(FlaskForm):
    comment = StringField('Comment Field', validators=[DataRequired()])
    pin_id = IntegerField('pin_id')
    user_id = IntegerField('user_id')
