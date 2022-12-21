import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { thunkLoadOneProduct } from "../../store/product"
import noimage from "../Images/noimage.jpg"

const ProductDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const product = useSelector((state) => state.products.singleProduct)

  useEffect(() => {
    dispatch(thunkLoadOneProduct(id))
  }, [dispatch, id])

  if (!product) return null

  return (
    <>
      <div>
        {product.Reviews && (
          product.Reviews.map((rev) => (
            <div key={rev.id}>
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
      <div>{product.price}</div>
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
