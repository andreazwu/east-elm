import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./ProfileButton.css";

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="navbar-profile-container">
      <div onClick={openMenu} className="navbar-profile-button">
        <i className="fa-regular fa-user"></i>
        &nbsp; Account
        {/* <i className="fa-solid fa-angle-down"></i> */}
      </div>
      {showMenu && (
        <>
          <div className="profile-dropdown">
            <div className="dropdown-item-top">
              <div className="profile-name">Hello, {user.firstName}</div>
            </div>
            <NavLink to="/my-products" style={{ textDecoration: "none" }}>
              <div className="dropdown-item">
                <div className="my-reviews">My Products</div>
              </div>
            </NavLink>
            <NavLink to="/my-reviews" style={{ textDecoration: "none" }}>
              <div className="dropdown-item">
                <div className="my-reviews">My Reviews</div>
              </div>
            </NavLink>
            <NavLink to="/new-product" style={{ textDecoration: "none" }}>
              <div className="dropdown-item">
                <div className="my-reviews">List New Product</div>
              </div>
            </NavLink>
            {/* <div className='dropdown-item'>
            <div className='sign-out-img'><i className="fa-sharp fa-solid fa-arrow-right-from-bracket"></i></div> */}
            <LogoutButton />
            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileButton;
