import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import { thunkGetUserReviews } from "../../../store/review"
import MyReview from "./MyReview"
import "../Reviews.css"

const MyReviews = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const reviewsArr = useSelector((state) => Object.values(state.reviews.user))

  useEffect(() => {
    dispatch(thunkGetUserReviews())
  }, [dispatch, reviewsArr.length])

  if (!user) return <Redirect to="/" />

  return (
    <div className="myreviews-cover">

      <div className="myreviews-title-wrapper">
        <div className="myreviews-title">
          <h2>My Reviews</h2>
          <Link to="/my-orders">
            <button className="myreviews-list-button">
              LEAVE A NEW REVIEW (my orders)
            </button>
          </Link>
        </div>
      </div>

      <div className="myreview-list-wrapper">
        <div className="myreview-list">
          {reviewsArr.length > 0 && (
            reviewsArr.reverse().map(review => (
              <MyReview key={review.id} review={review} />
            ))
          )}
          {reviewsArr.length === 0 && (
            <div className="user-no-review">You haven't left any review yet.</div>
          )}
        </div>
      </div>

    </div>
  )
}

export default MyReviews
