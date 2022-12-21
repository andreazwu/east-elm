from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, Image
from app.forms import ProductForm
from app.api.auth_routes import validation_errors_to_error_messages

product_routes=Blueprint("products", __name__)

# return all products
@product_routes.route("/")
def get_all_products():
  products = Product.query.all()

  if products is not None:
    return {"Products": [product.to_dict_url() for product in products]}, 200


# return one product
@product_routes.route("/<int:id>")
def get_one_product(id):
  product = Product.query.get(id)

  if product is not None:
    return product.to_dict_full(), 200
  else:
    return {"message": f"product with the id of {id} could not be found"}, 404


# return all products listed by the current user
@product_routes.route("/current")
@login_required
def get_my_products():
  user_id = current_user.id
  products = Product.query.filter(Product.seller_id == user_id).all()

  if products is not None:
    return {"Products": [product.to_dict_url() for product in products]}, 200


# list a new product
@product_routes.route("/", methods=["POST"])
@login_required
def create_product():
  form = ProductForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    data = Product(
      seller_id=current_user.id,
      category=form.data["category"],
      name=form.data["name"],
      description=form.data["description"],
      details=form.data["details"],
      colors=form.data["colors"],
      price=form.data["price"]
    )
    db.session.add(data)
    db.session.commit()

    # add uploaded images
    image1 = Image(product_id=data.id, url=form.data["url1"])
    db.session.add(image1)

    if form.data["url2"]:
      image2 = Image(product_id=data.id, url=form.data["url2"])
      db.session.add(image2)

    if form.data["url3"]:
      image3 = Image(product_id=data.id, url=form.data["url3"])
      db.session.add(image3)

    if form.data["url4"]:
      image4 = Image(product_id=data.id, url=form.data["url4"])
      db.session.add(image4)

    db.session.commit()

    return data.to_dict_url(), 201

  else:
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400
