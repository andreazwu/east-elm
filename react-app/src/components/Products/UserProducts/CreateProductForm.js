import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { thunkCreateProduct } from "../../../store/product";
import "../Products.css";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [category, setCategory] = useState("Furniture");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [details, setDetails] = useState("Eligible for free shipping")
  // const [colors, setColors] = useState("Neutrals")
  const [price, setPrice] = useState(100.0);
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!user) setErrors(["user: You must be logged in to list a product"]);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const productinfo = {
      category,
      name,
      description,
      price,
      details: "Eligible for free shipping",
      colors: "Neutrals",
      url1: url1.trim(),
      url2: url2.trim(),
      url3: url3.trim(),
      url4: url4.trim(),
    };

    const response = await dispatch(thunkCreateProduct(productinfo));
    if (response) setErrors(response);
    else {
      reset();
      return history.push("/my-products");
    }
  };

  const reset = () => {
    setCategory("");
    setName("");
    setDescription("");
    // setDetails("Eligible for free shipping")
    // setColors("Neutrals")
    setPrice(100.0);
    setUrl1("");
    setUrl2("");
    setUrl3("");
    setUrl4("");
    setHasSubmitted(false);
  };

  const category_choices = [
    "Furniture",
    "Outdoor & Garden",
    "Bedding",
    "Bath",
    "Pillows & Decor",
    "Storage",
    "Holidays",
  ];

  // const color_choices = ["Grays", "Browns", "Neutrals", "Whites", "Black", "Multi"]
  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page-cover">
      <div className="login-page-content">
        <div className="login-page-title">
          <h3>List a new product</h3>
          <p>Please enter the following information.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            {hasSubmitted &&
              errors &&
              errors.map((error, ind) => (
                <div key={ind} className="validation-errors">
                  {error.split(": ")[1]}
                </div>
              ))}
          </div>
          <div className="product-form-element">
            <label>
              Name
              {/* <span className="required">(required)</span> */}
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="product-form-element">
            <label>
              Category
              {/* <span className="required">(required)</span> */}
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {category_choices.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="product-form-element product-form-description">
            <label>
              Description
              {/* <span className="required">(required)</span> */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div className="product-form-element">
            <label>
              Price
              {/* <span className="required">(required)</span> */}
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>
          <div className="product-form-element">
            <label>
              {" "}
              Image 1
              <input
                className="addImage-input"
                type="text"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
              />
            </label>
          </div>
          <div className="product-form-element">
            <label>
              {" "}
              Image 2
              <input
                className="addImage-input"
                type="text"
                placeholder="Optional"
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
              />
            </label>
          </div>
          <div className="product-form-element">
            <label>
              {" "}
              Image 3
              <input
                className="addImage-input"
                type="text"
                placeholder="Optional"
                value={url3}
                onChange={(e) => setUrl3(e.target.value)}
              />
            </label>
          </div>
          <div className="product-form-element">
            <label>
              {" "}
              Image 4
              <input
                className="addImage-input"
                type="text"
                placeholder="Optional"
                value={url4}
                onChange={(e) => setUrl4(e.target.value)}
              />
            </label>
          </div>

          <button className="product-form-btn" type="submit">
            ADD PRODUCT
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
