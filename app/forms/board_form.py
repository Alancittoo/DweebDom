from flask_wtf import FlaskForm
from wtforms import StringField , IntegerField, SubmitField, BooleanField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

class BoardForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description")
    is_public = BooleanField("Is_Public", default=True)
    user_id = IntegerField('user_id')
