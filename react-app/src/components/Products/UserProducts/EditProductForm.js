import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateProduct } from "../../../store/product";

const EditProductForm = ({ product, setShowEditModal }) => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState(product.category);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [details, setDetails] = useState(product.details);
  const [colors, setColors] = useState(product.colors);
  const [price, setPrice] = useState(product.price);
  // const [url1, setUrl1] = useState(product.Images[0].url)
  // const [url2, setUrl2] = useState(product.Images[1] ? product.Images[1].url : "")
  // const [url3, setUrl3] = useState(product.Images[2] ? product.Images[2].url : "")
  // const [url4, setUrl4] = useState(product.Images[3] ? product.Images[3].url : "")
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const productinfo = {
      category,
      name,
      description,
      price,
      details,
      colors,
      url1: product.Images[0].url,
      // url2: product.Images[1].url,
      // url3: product.Images[2].url,
      // url4: product.Images[3].url
    };

    const response = await dispatch(
      thunkUpdateProduct(product.id, productinfo)
    );
    if (response) setErrors(response);
    else {
      reset();
      setShowEditModal(false);
    }
  };

  const reset = () => {
    setCategory("");
    setName("");
    setDescription("");
    setDetails("Eligible for free shipping");
    setColors("Neutrals");
    setPrice(100.0);
    // setUrl1("")
    // setUrl2("")
    // setUrl3("")
    // setUrl4("")
    setErrors([]);
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
  const color_choices = [
    "Grays",
    "Browns",
    "Neutrals",
    "Whites",
    "Black",
    "Multi",
  ];

  return (
    <div>
      <div>Edit a Product</div>
      <div>
        {hasSubmitted &&
          errors &&
          errors.map((error, ind) => (
            <div key={ind} className="validation-errors">
              {error.split(": ")[1]}
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
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
            Colors
            {/* <span className="required">(required)</span> */}
            <select
              name="colors"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
            >
              {color_choices.map((color, i) => (
                <option key={i} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="product-form-element product-form-description">
          <label>
            Details
            {/* <span className="required">(required)</span> */}
            <textarea
              placeholder='Optional. Separate bullet points by a single period "."'
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </label>
        </div>
        {/* <div className="product-form-element">
          <label> Image 1
            <input className='addImage-input'
                type="text"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
            />
          </label>
        </div>
        <div className="product-form-element">
          <label> Image 2
            <input className='addImage-input'
                type="text"
                placeholder="Optional"
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
            />
          </label>
        </div>
        <div className="product-form-element">
          <label> Image 3
            <input className='addImage-input'
                type="text"
                placeholder="Optional"
                value={url3}
                onChange={(e) => setUrl3(e.target.value)}
            />
          </label>
        </div>
        <div className="product-form-element">
          <label> Image 4
            <input className='addImage-input'
                type="text"
                placeholder="Optional"
                value={url4}
                onChange={(e) => setUrl4(e.target.value)}
            />
          </label>
        </div> */}

        <button className="product-form-btn" type="submit">
          EDIT PRODUCT
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
