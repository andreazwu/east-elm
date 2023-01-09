import React from "react";
import { useDispatch } from "react-redux";
import { thunkRemoveReview } from "../../../store/review";
import "../Reviews.css";

const DeleteReviewAlert = ({ id, setShowDeleteReviewAlert }) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(thunkRemoveReview(id)).then(() =>
      setShowDeleteReviewAlert(false)
    );
  };
  return (
    <div className="delete-form-wrapper">
      {/* <h4>Delete Review</h4> */}
      <div>
        <p>Are you sure you wish to delete this review?</p>
        <p className="center">This action cannot be undone.</p>
        <div className="center">
          <button
            className="review-form-btn"
            onClick={() => setShowDeleteReviewAlert(false)}
          >
            CANCEL
          </button>
          <button className="review-form-delete-btn" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewAlert;
