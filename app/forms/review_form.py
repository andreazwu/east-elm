from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


class ReviewForm(FlaskForm):
  stars = IntegerField("stars", validators=[DataRequired("Star rating is required"), NumberRange(min=1, max=5, message="Star rating must be between 1 and 5")])

  # optional fields
  title = TextAreaField("title", validators=[Length(max=99, message="Title must be fewer than 100 characters")])
  content = TextAreaField("content", validators=[Length(max=999, message="Review must be fewer than 1000 characters")])
