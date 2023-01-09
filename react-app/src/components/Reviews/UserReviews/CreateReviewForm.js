import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateNewReview } from "../../../store/review";
import HoverStars from "./HoverStars";
import "../Reviews.css";

const CreateReviewForm = ({ productId, setShowAddReviewModal }) => {
  const dispatch = useDispatch();

  const [stars, setStars] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!user) setErrors(["You must be logged in to leave a review"]);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const reviewInfo = { stars, title, content };

    const response = await dispatch(
      thunkCreateNewReview(productId, reviewInfo)
    );

    if (response) {
      console.log(response);
      setErrors(response);
    } else {
      reset();
      setShowAddReviewModal(false);
    }
  };

  const reset = () => {
    setTitle("");
    setContent("");
    setStars(5);
    setErrors([]);
    setHasSubmitted(false);
  };

  return (
    <div className="review-form-wrapper">
      <div className="review-form-title">
        <h3>Create a Review</h3>
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
            {/* <HoverStars stars={stars} setStars={setStars} /> */}
            <input
              name="stars"
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            />
          </label>
        </div>
        <div className="review-form-element">
          <label>
            Title
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="review-form-element">
          <label>
            Content
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
        </div>
        <button className="review-form-btn" type="submit">
          CREATE REVIEW
        </button>
      </form>
    </div>
  );
};

export default CreateReviewForm;
