import React from "react"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import LogoutButton from "../auth/LogoutButton"
import logo from "../Images/logo.jpg"
import "./Navigation.css"

const NavBar = () => {
  const user = useSelector((state) => state.session.user)

  let sessionLinks
  if (user) {
    sessionLinks = (
      <ul>
        <li><Link to={`/users/${user.id}`}>My Account</Link></li>
        <li><Link to={"/my-products"}>My Products</Link></li>
        {/* <li><Link to={"/my-orders"}>My Orders</Link></li> */}
        <li><Link to={"/my-reviews"}>My Reviews</Link></li>
        <li><LogoutButton /></li>
      </ul>
    )
  } else {
    sessionLinks = (
      <ul>
        <li><Link to={"/login"}>Log In</Link></li>
        <li><Link to={"/signup"}>Sign Up</Link></li>
      </ul>
    )
  }

  return (
    <nav>
      <div>
        <NavLink exact to="/" activeClassName="active">
          <div className="navBar-home">
            <img src={logo} alt="logo" className="logo"/>
          </div>
        </NavLink>
      </div>

      <div>
        <div>
          <i className="fa-regular fa-user"></i>
          &nbsp;
          {
            user ?
            "Account" :
            "Log In/ Sign Up"
          }
        </div>
        <div>
          {sessionLinks}
        </div>
      </div>

      <ul className="navbar">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" exact={true} activeClassName="active">
            Products
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
