import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkLoadMyProducts } from "../../store/product"
import { Link, Redirect } from "react-router-dom"
import noimage from "../Images/noimage.jpg"
import "./Products.css"

const MyProducts = () => {
  const user = useSelector((state) => state.session.user)
  const dispatch = useDispatch()
  const productsArr = useSelector((state) => Object.values(state.products.myProducts))

  useEffect(() => {
    dispatch(thunkLoadMyProducts())
  }, [dispatch])

  if (!user) return <Redirect to="/" />

  return (
    <>
      <div>
        {
          productsArr.length === 0 ?
          (<>
            <h1>My Products</h1>
            <h4>You haven't listed any products.</h4>
          </>) :
          <h1>My Products</h1>
        }

        <Link to="/new-product">
          <button>
            List a New Product
          </button>
        </Link>
      </div>

      {productsArr.map((product) => (
        <div className='product-card' key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className='product-image'>
                <img
                  src={product.Images[0].url}
                  alt='product-browser-img'
                  onError={e => e.target.src = {noimage}}
                />
            </div>
          </Link>
          <div className='product-card-info'>
            <Link to={`/products/${product.id}`}>
                <p className='product-card-name'>{product.name}</p>
            </Link>
            <p className='product-card-price'>${product.price}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default MyProducts
