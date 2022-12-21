from .db import db, environment, SCHEMA, add_prefix_for_prod


class Cart_item(db.Model):
  __tablename__ = "cart_items"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  quantity = db.Column(db.Integer, nullable=False)

  # relationship
  user = db.relationship("User", back_populates="cart_items")
  product = db.relationship("Product", back_populates="cart_items")

  def to_dict(self):
    return {
      "id": self.id,
      "productId": self.product_id,
      "userId": self.user_id,
      "quantity": self.quantity
    }

  def to_dict_full(self):
    return {
      "id": self.id,
      "productId": self.product_id,
      "userId": self.user_id,
      "quantity": self.quantity,
      "User": self.user.to_dict(),
      "Product": self.product.to_dict(),
    }
