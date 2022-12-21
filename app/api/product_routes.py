from flask import Blueprint
from app.models import db, Product

product_routes=Blueprint("products", __name__)

@product_routes.route("/")
def get_all_products():
  products = Product.query.all()

  if products is not None:
    return {"Products": [product.to_dict_url() for product in products]}, 200

@product_routes.route("/<int:id>")
def get_one_product(id):
  product = Product.query.get(id)

  if product is not None:
    return product.to_dict_full(), 200
  else:
    return {"message": f"product with the id of {id} could not be found"}, 404
