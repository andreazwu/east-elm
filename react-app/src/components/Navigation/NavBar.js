import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import logo from "../Images/logo.jpg";
import "./Navigation.css";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <nav>
      <div className="navBar-main">
        <div className="navBar-outer">
          <div className="navBar-link">
            <NavLink exact to="/" activeClassName="active">
              <div className="navBar-home">
                <img src={logo} alt="logo" className="logo" />
              </div>
            </NavLink>
          </div>
        </div>
        <div className="icon-wrap">
          {user ? (
            <>
              <div className="navBar-link">
                <ProfileButton user={user} />
              </div>
            </>
          ) : (
            <>
              <div className="navBar-link sign-in">
                <div className="navbar-profile-button">
                  <i className="fa-regular fa-user"></i>
                  <NavLink
                    className="login-text"
                    exact
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    &nbsp; Log In
                  </NavLink>
                  <NavLink
                    className="login-text"
                    exact
                    to="/signup"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    &nbsp;| Sign Up
                  </NavLink>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
