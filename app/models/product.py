from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
  __tablename__="products"

  if environment == "production":
    __table_args__ = {"schema": SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  seller_id = db.Column(db.Integer, db.Foreignkey(add_prefix_for_prod("users.id")), nullable=False)
  category = db.Column(db.String(50), nullable=False)
  name = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(1000), nullable=False)
  details = db.Column(db.String(1000))
  colors = db.Column(db.String(100))
  price = db.Column(db.Float(precision=2, asdecimal=False), nullable=False)

  # relationship attributes
  user = db.relationship("User", back_populates="products")

  def to_dict(self):
    return {
      "id": self.id,
      "seller_id": self.seller_id,
      "category": self.category,
      "name": self.name,
      "description": self.description,
      "details": self.details,
      "colors": self.colors,
      "price": self.price
    }
