import { useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "../../../context/Modal"
import DeleteReviewAlert from "./DeleteReviewAlert"
import EditReviewForm from "./EditReviewForm"
import noimage from "../../Images/noimage.jpg"

const MyReview = ({ review }) => {
  const [showEditReviewModal, setShowEditReviewModal] = useState(false)
  const [showDeleteReviewAlert, setShowDeleteReviewAlert] = useState(false)

  return (
    <div className="myreview-wrapper">

      <div className="myreview-img">
        <Link to={`/products/${review.Product.id}`}>
          <img
            src={review.Product.Images[0].url}
            alt="myreview-img"
            onError={e => e.target.src={noimage}}
          />
        </Link>
      </div>

      <div className="myreview-info">
        <Link to={`/products/${review.Product.id}`}>
          <div className="myreview-title">{review.title}</div>
        </Link>
        <div className="myreview-stars">
          {
            [...Array(review.stars)].map((star) => (<i className="fa-solid fa-star"></i>))
          }
        </div>
        <div className="myreview-content">{review.content}</div>
      </div>

      <div className="myreview-buttons-container">
        <button className="myreview-edit" onClick={()=>setShowEditReviewModal(true)}>
          EDIT
        </button>
        <div>
        {showEditReviewModal && (
          <Modal onClose={()=>setShowEditReviewModal(false)}>
            <EditReviewForm
              setShowEditReviewModal={setShowEditReviewModal}
              review={review}
            />
          </Modal>
        )}
        </div>
        <button className="myreview-delete" onClick={()=>setShowDeleteReviewAlert(true)}>
          DELETE
        </button>
        <div>
        {showDeleteReviewAlert && (
          <Modal onClose={()=>setShowDeleteReviewAlert(false)}>
            <DeleteReviewAlert
              setShowDeleteReviewAlert={setShowDeleteReviewAlert}
              id={review.id}
            />
          </Modal>
        )}
        </div>
      </div>

    </div>
  )
}

export default MyReview
