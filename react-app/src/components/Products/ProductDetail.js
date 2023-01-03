import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { thunkLoadOneProduct } from "../../store/product"
import { thunkGetProductReviews } from "../../store/review"
import noimage from "../Images/noimage.jpg"

const ProductDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const product = useSelector((state) => state.products.singleProduct)
  const reviewsArr = useSelector((state) => Object.values(state.reviews.product))
  console.log("reviews from useSelector:", reviewsArr)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(thunkLoadOneProduct(id))
      .then(() => dispatch(thunkGetProductReviews(id)))
      .then(() => setIsLoaded(true))
  }, [dispatch, id])

  if (isLoaded && !Object.values(product).length) {
    return <Redirect to="/pagenotfound" />
  }

  return (
    <>
      {/* <div>
        {product.Reviews && (
          product.Reviews.map((rev) => (
            <div key={rev.id}>
              <p>{rev.stars}</p>
              <p>{rev.title}</p>
              <p>{rev.content}</p>
            </div>
          ))
        )}
      </div> */}
      <div>
        {reviewsArr.length > 0 && (
          reviewsArr.map((rev) => (
            <div key={rev.id}>
              <p>{rev.User.firstName} {rev.User.lastName}</p>
              <p>{rev.stars}</p>
              <p>{rev.title}</p>
              <p>{rev.content}</p>
            </div>
          ))
        )}
      </div>
      <div>
        {product.Images && (
          product.Images.map((image) => (
              <img key={image.id} src={image.url}
                alt='detail-page-product-showcase'
                onError={e => e.target.src = {noimage}} />
          ))
        )}
      </div>

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
    </>
  )
}

export default ProductDetail
