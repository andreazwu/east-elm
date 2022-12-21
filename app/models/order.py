from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order(db.Model):
  __tablename__="orders"

  if environment == "production":
    __table_args__ = {"schema": SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())

  # relationship
  user = db.relationship("User", back_populates="orders")
  order_items = db.relationship("Order_item", back_populates="order", cascade="all, delete")

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.user_id,
      "createdAt": self.created_at
    }

  def to_dict_full(self):
    return {
      "id": self.id,
      "userId": self.user_id,
      "createdAt": self.created_at,
      "User": self.user.to_dict(),
      "OrderItems": [item.to_dict() for item in self.order_items]
    }
