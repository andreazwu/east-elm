import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { thunkLoadOneProduct } from "../../store/product";
import { thunkGetProductReviews } from "../../store/review";
import { Modal } from "../../context/Modal";
import CreateReviewForm from "../Reviews/UserReviews/CreateReviewForm";
import noimage from "../Images/noimage.jpg";
import "./Products.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.singleProduct);
  console.log("product from useSelector:", product);
  const reviewsArr = useSelector((state) =>
    Object.values(state.reviews.product)
  );
  console.log("reviewsArr from useSelector:", reviewsArr);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  let seller = false;
  if (user?.id === product?.sellerId) seller = true;

  let hasReviewed = false;
  let reviewers = [];
  reviewsArr.forEach((rev) => reviewers.push(rev.User.id));
  if (reviewers.includes(user?.id)) hasReviewed = true;

  let starsArr = [];
  reviewsArr.forEach((rev) => starsArr.push(rev.stars));
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  let avgStars = 0;
  if (starsArr.length) avgStars = average(starsArr);

  useEffect(() => {
    dispatch(thunkLoadOneProduct(id))
      .then(() => setIsLoaded(true))
      .then(() => dispatch(thunkGetProductReviews(id)));
  }, [dispatch, id, reviewsArr.length]);

  if (isLoaded && !Object.values(product).length) {
    return <Redirect to="/pagenotfound" />;
  }

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const yr = date.getFullYear();
    return `${month} ${day} ${yr}`;
  };

  return (
    <div className="detail-page-cover">
      <div className="detail-page-frame">
        <div className="detail-page-main">
          <div className="detail-page-left-panel">
            {product.Images &&
              product.Images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  className="detail-page-img"
                  alt="detail-page-product-showcase"
                  onError={(e) => (e.target.src = noimage)}
                />
              ))}
          </div>

          <div className="detail-page-right-panel">
            <div className="detail-page-product-name">{product.name}</div>
            <div className="detail-page-price">
              ${Number(product.price).toFixed(2)}
            </div>
            <p className="detail-page-description-title">OVERVIEW</p>
            <div className="detail-page-description">{product.description}</div>
            <div>
              {product.details && (
                <ul className="detail-page-bullet-points">
                  {product.details.split(".").map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
            <p className="detail-page-description-title">
              REVIEWS ({reviewsArr.length}) &nbsp;
              <span className="product-detail-avgrating-star">
                {!avgStars ? (
                  <span>
                    {[...Array(5 - Math.ceil(avgStars))].map((star) => (
                      <i class="fa fa-star-o" aria-hidden="true"></i>
                    ))}
                  </span>
                ) : Number(avgStars) % 1 ? (
                  <span>
                    {[...Array(Math.floor(avgStars))].map((star) => (
                      <i className="fa-solid fa-star"></i>
                    ))}
                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                    {[...Array(5 - Math.ceil(avgStars))].map((star) => (
                      <i class="fa fa-star-o" aria-hidden="true"></i>
                    ))}
                  </span>
                ) : (
                  <span>
                    {[...Array(avgStars)].map((star) => (
                      <i className="fa-solid fa-star"></i>
                    ))}
                  </span>
                )}
              </span>
            </p>
            <div className="review-menu-review-list">
              {reviewsArr.length > 0 &&
                reviewsArr.reverse().map((rev) => (
                  <div className="review-menu-ind-review" key={rev.id}>
                    <div className="review-item-stars">
                      <span>
                        {[...Array(rev.stars)].map((star) => (
                          <i className="fa-solid fa-star"></i>
                        ))}
                        {[...Array(5 - rev.stars)].map((star) => (
                          <i class="fa fa-star-o" aria-hidden="true"></i>
                        ))}
                      </span>
                    </div>
                    <p className="review-item-title">{rev.title}</p>
                    <p className="review-item-content">{rev.content}</p>
                    <div className="review-item-user">
                      <p>By {rev.User.firstName}, </p>
                      <p>{convertDate(rev.createdAt)}</p>
                    </div>
                  </div>
                ))}
            </div>
            {/* only show "create review" button to logged in user/ who has not left a review/ NON-seller */}
            <div>
              {user && !seller && !hasReviewed && (
                <>
                  <button
                    className="create-review-button"
                    onClick={() => setShowAddReviewModal(true)}
                  >
                    leave a review
                  </button>
                  <div>
                    {showAddReviewModal && (
                      <Modal onClose={() => setShowAddReviewModal(false)}>
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
      </div>
    </div>
  );
};

export default ProductDetail;
