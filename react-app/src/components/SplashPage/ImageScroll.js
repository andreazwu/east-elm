import { Link } from "react-router-dom";
import "./ImageScroll.css";

function ImageScroll() {
  const scrolll = () => {
    var left = document.querySelector(".scroll-images");
    left.scrollBy(-350, 0);
  };

  const scrollr = () => {
    var right = document.querySelector(".scroll-images");
    right.scrollBy(350, 0);
  };

  return (
    <div className="main-scroll-div">
      <div>
        <button className="scroll-btn" onClick={scrolll}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
      </div>
      <div className="scroll-images">
        <Link to="/products" className="scroll-image-child">
          <img
            className="scroll-child"
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/016.jpg"
            alt="img-scroll"
          />
        </Link>
        <Link to="/products" className="scroll-image-child">
          <img
            className="scroll-child"
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/012.jpg"
            alt="img-scroll"
          />
        </Link>
        <Link to="/products" className="scroll-image-child">
          <img
            className="scroll-child"
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/014.jpg"
            alt="img-scroll"
          />
        </Link>
        <Link to="/products" className="scroll-image-child">
          <img
            className="scroll-child"
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/006.jpg"
            alt="img-scroll"
          />
        </Link>
        <Link to="/products" className="scroll-image-child">
          <img
            className="scroll-child"
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/015.jpg"
            alt="img-scroll"
          />
        </Link>
        <Link to="/products" className="scroll-image-child">
          <img
            className="scroll-child"
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/005.jpg"
            alt="img-scroll"
          />
        </Link>
        <Link to="/products" className="scroll-image-child">
          <img
            className="scroll-child"
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/009.jpg"
            alt="img-scroll"
          />
        </Link>
      </div>
      <div>
        <button className="scroll-btn" onClick={scrollr}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}

export default ImageScroll;
