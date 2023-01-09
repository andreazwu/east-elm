import React from "react";
import { useDispatch } from "react-redux";
import { thunkDeleteProduct } from "../../../store/product";

const DeleteProductAlert = ({ id, setShowDeleteAlert }) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteProduct(id)).then(() =>
      setShowDeleteAlert(false)
    );
  };
  return (
    <div className="delete-form-wrapper">
      <div>
        <p>Are you sure you wish to delete this product?</p>
        <p className="center">This action cannot be undone.</p>
        <div className="center">
          <button
            className="review-form-btn"
            onClick={() => setShowDeleteAlert(false)}
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

export default DeleteProductAlert;
