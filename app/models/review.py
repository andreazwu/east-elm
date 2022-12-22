from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    title = db.Column(db.String(100))
    content = db.Column(db.String(1000))
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())

    # relationship
    user = db.relationship("User", back_populates="reviews")
    product = db.relationship("Product", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "productId": self.product_id,
            "title": self.title,
            "content": self.content,
            "stars": self.stars,
            "createdAt": self.created_at,
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "productId": self.product_id,
            "title": self.title,
            "content": self.content,
            "stars": self.stars,
            "createdAt": self.created_at,
            "User": self.user.to_dict(),
            "Product": self.product.to_dict_url()
    }
