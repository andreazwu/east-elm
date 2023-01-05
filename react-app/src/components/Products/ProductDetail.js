import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { thunkLoadOneProduct } from "../../store/product"
import { thunkGetProductReviews } from "../../store/review"
import { Modal } from "../../context/Modal"
import CreateReviewForm from "../Reviews/UserReviews/CreateReviewForm"
import noimage from "../Images/noimage.jpg"
import "./Products.css"

const ProductDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const user = useSelector((state) => state.session.user)
  const product = useSelector((state) => state.products.singleProduct)
  console.log("product from useSelector:", product)
  const reviewsArr = useSelector((state) => Object.values(state.reviews.product))
  console.log("reviewsArr from useSelector:", reviewsArr)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showAddReviewModal, setShowAddReviewModal] = useState(false)


  let seller = false
  if (user?.id === product?.sellerId) seller = true

  let hasReviewed = false
  let reviewers = []
  reviewsArr.forEach((rev) => reviewers.push(rev.User.id))
  if (reviewers.includes(user?.id)) hasReviewed = true


  useEffect(() => {
    dispatch(thunkLoadOneProduct(id))
      .then(() => setIsLoaded(true))
      .then(() => dispatch(thunkGetProductReviews(id)))
  }, [dispatch, id, reviewsArr.length])

  if (isLoaded && !Object.values(product).length) {
    return <Redirect to="/pagenotfound" />
  }

  return (
    <>




      <div className="detail-main">
        <div className="detail-left">
          {product.Images && (
            product.Images.map((image) => (
                <img key={image.id} src={image.url}
                  className="detail-img"
                  alt='detail-page-product-showcase'
                  onError={e => e.target.src = {noimage}} />
            ))
          )}
        </div>

        <div className="detail-right">
          <div>{product.name}</div>
          <div>${Number(product.price).toFixed(2)}</div>
          <div>{product.description}</div>
          <div>
            {product.details && (
              <ul>
                {product.details.split(".").map((point,i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            {reviewsArr.length > 0 && (
              reviewsArr.reverse().map((rev) => (
                <div key={rev.id}>
                  <p>{rev.User.firstName} {rev.User.lastName}</p>
                  <p>{rev.stars}</p>
                  <p>{rev.title}</p>
                  <p>{rev.content}</p>
                </div>
              ))
            )}
          </div>
          {/* only show "create review" button to logged in user/ who has not left a review/ NON-seller */}
          {console.log("user:", user, "seller:", seller, "hasReviewed:", hasReviewed)}
          <div>
              {
              user &&
              !seller &&
              !hasReviewed && (
                <>
                <button className="create-review-button"
                onClick={()=>setShowAddReviewModal(true)}>
                  can leave review
                </button>
                <div>
                {showAddReviewModal && (
                  <Modal onClose={()=>setShowAddReviewModal(false)}>
                    <CreateReviewForm
                      setShowAddReviewModal={setShowAddReviewModal}
                      productId={id}
                    />
                  </Modal>
                )}
                </div>
                </>
              )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
