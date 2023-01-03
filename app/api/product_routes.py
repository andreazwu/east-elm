from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, Image, Review
from app.forms import ProductForm, ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime

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
    return {"message": f"product id {id} could not be found"}, 404


# return all products listed by the current user
@product_routes.route("/current")
@login_required
def get_my_products():
  user_id = current_user.id
  products = Product.query.filter(Product.seller_id == user_id).all()

  if products is not None:
    return {"Products": [product.to_dict_url() for product in products]}, 200


# create a new product
@product_routes.route("", methods=["POST"])
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
    # {"errors": [ "field: error", " ", " "]}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# update a product
@product_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_product(id):
  form = ProductForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  product = Product.query.get(id)

  if product is not None:
    if product.seller_id != current_user.id:
      return {"errors": [f"unauthorized!! you are not the owner of product id {id}"]}, 403
    elif form.validate_on_submit():
      product.category=form.data["category"]
      product.name=form.data["name"]
      product.description=form.data["description"]
      product.details=form.data["details"]
      product.colors=form.data["colors"]
      product.price=form.data["price"]
      db.session.commit()
      return product.to_dict_url(), 200
    else:
      # {"errors": [ "field: error", " ", " "]}
      return {"errors": validation_errors_to_error_messages(form.errors)}, 400
  else:
    return {"errors": [f"product id {id} could not be found"]}, 404


# delete a product
@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
  product = Product.query.get(id)

  if product is not None:
    if product.seller_id == current_user.id:
      db.session.delete(product)
      db.session.commit()
      return {"message": f"successfully deleted product id {id}"}, 200
    else:
      return {"message": f"unauthorized!! you are not the owner of product id {id}"}, 403
  else:
    return {"message": f"product id {id} could not be found"}, 404


# -----------------------------------------
# return all reviews for a specific product
@product_routes.route("/<int:id>/reviews")
def get_product_reviews(id):
  product = Product.query.get(id)

  if product is not None:
    product_reviews = Review.query.filter(Review.product_id == id).all()
    if product_reviews is not None:
      return {"Reviews": [review.to_dict_full() for review in product_reviews]}, 200
  else:
    return {"errors": [f"product id {id} could not be found"]}, 404

# add new review for a specific product
@product_routes.route("/<int:id>", methods=["POST"])
@login_required
def create_review(id):
  form = ReviewForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  product = Product.query.get(id)

  if product is None:
    return {"errors": [f"product id {id} could not be found"]}, 404

  if product.seller_id == current_user.id:
    return {"errors": ["you cannot review your own product"]} , 400

  product_reviews = Review.query.filter(Review.product_id == id).all()
  if product_reviews is not None:
    for review in product_reviews:
      if review.user_id == current_user.id:
        return {"errors": [f"you have already left a review {review.id} for this product id {id}"]}, 400

  if form.validate_on_submit():
    data = Review(
      user_id = current_user.id,
      product_id = id,
      stars = form.data["stars"],
      title = form.data["title"],
      content = form.data["content"],
      created_at = datetime.now()
    )
    db.session.add(data)
    db.session.commit()
    return data.to_dict_full(), 201
  else:
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400
