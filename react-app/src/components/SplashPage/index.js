import { Link } from "react-router-dom";
import ImageScroll from "./ImageScroll";
import "./SplashPage.css";

function SplashPage() {
  return (
    <div className="main-page">
      <div className="cozy-season-sec">
        <p>Your Perfect Home</p>
        <Link to="/products">Shop Now</Link>
      </div>
      <img
        className="first-subtitle"
        src="https://assets.weimgs.com/weimgs/rk/images/dp/ecm/202252/4109/001/004.jpg"
        alt="subtitle"
      />
      <ImageScroll />
      <Link to="/products">
        <img
          className="serene-sofa"
          src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/042.jpg"
          alt="serene-sofa"
        />
      </Link>
      <Link to="/products" className="two-bedding">
        <img
          src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/1325/001/016.jpg"
          alt="bedding-1"
        />
        <img
          src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/1325/001/020.jpg"
          alt="bedding-1"
        />
      </Link>
      <Link to="/products">
        <img
          className="decorating-pot"
          src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/047.jpg"
          alt="decorating-pot"
        />
      </Link>

      <Link to="/products" className="dream-bedroom">
        <div className="left">
          <img
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/1325/001/018.jpg"
            alt="dream-bedroom-left"
          />
        </div>
        <div className="right">
          <img
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/1325/001/009.jpg"
            alt="dream-bedroom-right-top"
          />
          <img
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/1325/001/004.jpg"
            alt="dream-bedroom-right-bottom"
          />
        </div>
      </Link>

      <Link to="/products">
        <img
          className="makeover"
          src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/043.jpg"
          alt="makeover"
        />
      </Link>

      <Link to="/products" className="bath-upgrade">
        <div className="left">
          <img
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/1325/001/019.jpg"
            alt="dream-bedroom-left"
          />
        </div>
        <div className="right">
          <img
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/1325/001/008.jpg"
            alt="dream-bedroom-right-top"
          />
          <img
            src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/1325/001/007.jpg"
            alt="dream-bedroom-right-bottom"
          />
        </div>
      </Link>

      {/* <Link to="/products" className="gif-wrap"> */}
      <iframe
        src="https://player.vimeo.com/video/780872938?h=b65fb5e3bf&amp;loop=1&amp;background=1&amp;autoplay=true"
        frameborder="0"
        className="spring-lookbook-gif"
      ></iframe>
      {/* </Link> */}
    </div>
  );
}

export default SplashPage;
