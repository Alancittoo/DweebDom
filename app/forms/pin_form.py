from flask_wtf import FlaskForm
from wtforms import StringField , IntegerField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class PinForm(FlaskForm):
    # image_url = StringField('Image file', validators = [DataRequired()]) #validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    image_url = FileField('Image file', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    title = StringField('Title', validators = [DataRequired()])
    description = StringField('Description')
    user_id = IntegerField('user_id')

class PinUpdateForm(FlaskForm):
    image_url = StringField('Image file') # No FileRequiredfor update
    title = StringField('Title', validators = [DataRequired()])
    description = StringField('Description')
    user_id = IntegerField('user_id')
