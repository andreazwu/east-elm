import React from "react"
import { useDispatch } from "react-redux"
import { thunkRemoveReview } from "../../../store/review"

const DeleteReviewAlert = ({id, setShowDeleteReviewAlert}) => {
  const dispatch = useDispatch()

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(thunkRemoveReview(id))
      .then(() => setShowDeleteReviewAlert(false))
  }
  return (
    <div>
      <h4>Delete Review</h4>
      <div>
        <p>Are you sure you wish to delete this review? This cannot be undone.</p>
        <div>
          <button onClick={()=>setShowDeleteReviewAlert(false)}>
            CANCEL
          </button>
          <button onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteReviewAlert
