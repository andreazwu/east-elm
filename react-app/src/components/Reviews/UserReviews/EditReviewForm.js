import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkEditReview } from "../../../store/review"
import HoverStars from "./HoverStars"

const EditReviewForm = ({ review, setShowEditReviewModal }) => {
  const dispatch = useDispatch()

  const [editStars, setEditStars] = useState(review.stars)
  const [editTitle, setEditTitle] = useState(review.title)
  const [editContent, setEditContent] = useState(review.content)
  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    const reviewInfo = {"stars": editStars, "title": editTitle, "content": editContent}

    const response = await dispatch(thunkEditReview(review.id, reviewInfo))

    if (response) {
      console.log(response)
      setErrors(response)
    }
    else {
      setErrors([])
      setShowEditReviewModal(false)
    }

  }


  return (
    <div>
      <div>Edit a Review</div>
      <div className="validation-errors">
        {
        hasSubmitted &&
        errors &&
        errors?.map((error, i)=>(<div key={i}>{error}</div>))
        }
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stars
            {/* <HoverStars stars={stars} setStars={setStars} /> */}
            <input
              name="stars"
              type="number"
              value={editStars}
              onChange={(e) => setEditStars(e.target.value)}
            />
          </label>
        </div>
        <div className="review-form-element">
          <label>Title
            <input
              name="title"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="review-form-element review-form-description">
          <label>Content
            <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
            />
          </label>
        </div>
        <button className="review-form-btn" type="submit">EDIT REVIEW</button>
      </form>
    </div>
  )
}

export default EditReviewForm
