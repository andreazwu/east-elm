import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import { thunkLoadMyProducts } from "../../../store/product"
import MyProduct from "./MyProduct"
import "../Products.css"

const MyProducts = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const productsArr = useSelector((state) => Object.values(state.products.myProducts))

  useEffect(() => {
    dispatch(thunkLoadMyProducts())
  }, [dispatch, productsArr.length])

  if (!user) return <Redirect to="/" />

  return (
    <div className="myproducts-cover">

      <div className="myproducts-title-wrapper">
        <div className="myproducts-title">
          <h2>My Product Listings</h2>
          <Link to="/new-product">
            <button className="myproducts-list-button">
              LIST A NEW PRODUCT
            </button>
          </Link>
        </div>
      </div>

      <div className="myproduct-list-wrapper">
        <div className="myproduct-list">
          {productsArr.length > 0 && (
            productsArr.reverse().map(product => (
              <MyProduct key={product.id} product={product} />
            ))
          )}
          {productsArr.length === 0 && (
            <div className="user-no-product">You haven't listed any product yet.</div>
          )}
        </div>
      </div>

    </div>
  )
}

export default MyProducts
