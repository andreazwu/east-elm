from flask import Blueprint
from app.models import db, Product

product_routes=Blueprint("products", __name__)

@product_routes.route("/")
def get_all_products():
  products = Product.query.all()

  if products is not None:
    return {"Products": [product.to_dict_url() for product in products]}, 200
