import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadAllProducts } from "../../store/product";
import { Link } from "react-router-dom";
import noimage from "../Images/noimage.jpg";
import "./Products.css";

const ProductBrowser = () => {
  const dispatch = useDispatch();
  const productsArr = useSelector((state) =>
    Object.values(state.products.allProducts)
  );

  useEffect(() => {
    dispatch(thunkLoadAllProducts());
  }, [dispatch]);

  if (!productsArr.length) return null;

  return (
    <div className="product-list-cover">
      <div className="product-list">
        {productsArr.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="product-image">
                <img
                  src={product.Images[0].url}
                  alt="product-browser-img"
                  onError={(e) => (e.target.src = { noimage })}
                />
              </div>
            </Link>
            <div className="product-card-info">
              <Link to={`/products/${product.id}`}>
                <p className="product-card-name">{product.name}</p>
              </Link>
              <p className="product-card-price">
                ${Number(product.price).toFixed(2)}
              </p>
              <p className="product-card-free-shipping">Free Shipping</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBrowser;
