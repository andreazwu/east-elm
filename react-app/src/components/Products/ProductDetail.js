import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { thunkLoadOneProduct } from "../../store/product"
import noimage from "../Images/noimage.jpg"

const ProductDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const product = useSelector((state) => state.products.singleProduct)
  // console.log("this is the useSelector product:", product)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(thunkLoadOneProduct(id))
      .then(()=>setIsLoaded(true))
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
