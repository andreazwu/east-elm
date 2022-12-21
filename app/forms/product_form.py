from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange, InputRequired


CATEGORIES = ["Furniture", "Outdoor & Garden", "Bedding", "Bath", "Pillows & Decor", "Storage", "Holidays"]

COLORS = ["Grays", "Browns", "Neutrals", "Whites", "Black", "Multi"]

class ProductForm(FlaskForm):
  category = SelectField("category", choices=CATEGORIES, validators=[DataRequired()])
  name = StringField("name", validators=[DataRequired("Name is required"), Length(min=1, max=99, message="Name must be fewer than 100 characters")])
  description = TextAreaField("description", validators=[DataRequired("Description is required"), Length(min=1, max=999, message="Description must be fewer than 1000 characters")])
  price = DecimalField("price", places=2, validators=[InputRequired("Price is required"), NumberRange(min=0.01, max=999999, message="Price must be less than $1,000,000")])

  url1 = StringField("url1", validators=[DataRequired("Please upload at least one image")])
  url2 = StringField("url2")
  url3 = StringField("url3")
  url4 = StringField("url4")

  # optional fields
  # detail bulletins separated by "."
  details = TextAreaField("details", validators=[Length(max=999, message="Details must be fewer than 1000 characters")])
  colors = SelectField("colors", choices=COLORS)
