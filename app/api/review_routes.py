from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

review_routes=Blueprint("reviews", __name__)

# return all reviews left by the current user
@review_routes.route("/current")
@login_required
def get_my_reviews():
  user_id = current_user.id
  reviews = Review.query.filter(Review.user_id == user_id).all()

  if reviews is not None:
    return {"Reviews": [review.to_dict_full() for review in reviews]}, 200


# edit a review
@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_review(id):
  review = Review.query.get(id)
  form = ReviewForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if review is not None:
    if review.user_id != current_user.id:
      return {"errors": [f"unauthorized!! you did not leave this review id {id}"]}, 403
    elif form.validate_on_submit():
      review.stars=form.data["stars"]
      review.title=form.data["title"]
      review.content=form.data["content"]
      db.session.commit()
      return review.to_dict_full(), 200
    else:
      return {"errors": validation_errors_to_error_messages(form.errors)}, 400
  else:
    return {"errors": [f"review id {id} could not be found"]}, 404


# delete a review
@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
  review = Review.query.get(id)

  if review is not None:
    if review.user_id == current_user.id:
      prod_id = review.product_id
      db.session.delete(review)
      db.session.commit()
      return {"message": f"successfully deleted review id{id} for product id {prod_id}"}, 200
    else:
      return {"message": f"unauthorized!! you did not leave this review id {id}"}, 403
  else:
    return {"message": f"review id {id} could not be found"}, 404
