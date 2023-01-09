from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange, InputRequired


CATEGORIES = ["Furniture", "Outdoor & Garden", "Bedding", "Bath", "Pillows & Decor", "Storage", "Holidays"]

COLORS = ["Grays", "Browns", "Neutrals", "Whites", "Black", "Multi"]




class ProductForm(FlaskForm):
  # custom validator
  def check_url_format(form, field):
    ALLOWED_EXTENSIONS = set(["png", "jpg", "jpeg"])
    ALLOWED_SCHEMES = set(["http", "https"])
    url = field.data
    url_array = url.lower().rsplit(".")
    extension_ok = url_array[-1] in ALLOWED_EXTENSIONS
    scheme_ok = url_array[0].rsplit("://")[0] in ALLOWED_SCHEMES
    if url and not (extension_ok and scheme_ok):
      raise ValidationError("Must provide valid http:// or https:// image url that ends with .jpg .jpeg or .png")

  category = SelectField("category", choices=CATEGORIES, validators=[DataRequired()])
  name = StringField("name", validators=[DataRequired("Name is required"), Length(min=1, max=79, message="Name must be fewer than 80 characters")])
  description = TextAreaField("description", validators=[DataRequired("Description is required"), Length(min=1, max=999, message="Description must be fewer than 1000 characters")])
  price = DecimalField("price", places=2, validators=[InputRequired("Price is required"), NumberRange(min=0.01, max=9999, message="Price must be less than $10,000")])

  url1 = StringField("url1", validators=[DataRequired("Please upload at least one image"), check_url_format])
  url2 = StringField("url2", validators=[check_url_format])
  url3 = StringField("url3", validators=[check_url_format])
  url4 = StringField("url4", validators=[check_url_format])

  # optional fields
  # detail bulletins separated by "."
  details = TextAreaField("details", validators=[Length(max=999, message="Details must be fewer than 1000 characters")])
  colors = SelectField("colors", choices=COLORS)
