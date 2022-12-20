from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order_item(db.Model):
  __tablename__="order_items"

  if environment == "production":
    __table_args__ = {"schema": SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False)
  product_id = db.Column(db.Integer, nullable=False)
  product_name = db.Column(db.String(100), nullable=False)
  product_price = db.Column(db.Float(precision=2, asdecimal=False), nullable=False)
  image_url = db.Column(db.String(2000), nullable=False)
  quantity = db.Column(db.Integer, nullable=False)

  # relationship
  order = db.relationship("Order", back_populates="order_items")

  def to_dict(self):
    return {
      "id": self.id,
      "orderId": self.order_id,
      "productId": self.product_id,
      "productName": self.product_name,
      "productPrice": self.product_price,
      "imageUrl": self.image_url,
      "quantity": self.quantity
    }

  def to_dict_full(self):
    return {
      "id": self.id,
      "orderId": self.order_id,
      "productId": self.product_id,
      "productName": self.product_name,
      "productPrice": self.product_price,
      "imageUrl": self.image_url,
      "quantity": self.quantity,
      "Order": self.order.to_dict()
    }
