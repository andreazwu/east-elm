import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkEditReview } from "../../../store/review";
import HoverStars from "./HoverStars";
import "../Reviews.css";

const EditReviewForm = ({ review, setShowEditReviewModal }) => {
  const dispatch = useDispatch();

  const [editStars, setEditStars] = useState(review.stars);
  const [editTitle, setEditTitle] = useState(review.title);
  const [editContent, setEditContent] = useState(review.content);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const reviewInfo = {
      stars: editStars,
      title: editTitle,
      content: editContent,
    };

    const response = await dispatch(thunkEditReview(review.id, reviewInfo));

    if (response) {
      console.log(response);
      setErrors(response);
    } else {
      setErrors([]);
      setShowEditReviewModal(false);
    }
  };

  return (
    <div className="review-form-wrapper">
      <div className="review-form-title">
        <h3>Edit a Review</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          {hasSubmitted &&
            errors &&
            errors.map((error, ind) => (
              <div key={ind} className="review-validation-errors">
                {error.split(": ")[1]}
              </div>
            ))}
        </div>
        <div className="review-form-element">
          <label>
            Stars
            {/* <HoverStars stars={editStars} setStars={setEditStars} /> */}
            <input
              name="stars"
              type="number"
              value={editStars}
              onChange={(e) => setEditStars(e.target.value)}
            />
          </label>
        </div>
        <div className="review-form-element">
          <label>
            Title
            <input
              name="title"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="review-form-element">
          <label>
            Content
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </label>
        </div>
        <button className="review-form-btn" type="submit">
          EDIT REVIEW
        </button>
      </form>
    </div>
  );
};

export default EditReviewForm;
