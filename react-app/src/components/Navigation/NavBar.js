import React from "react"
import { NavLink } from "react-router-dom"
import LogoutButton from "../auth/LogoutButton"
import logo from "../Images/logo.jpg"
import "./Navigation.css"

const NavBar = () => {
  return (
    <nav>
      <div>
        <NavLink exact to="/" activeClassName="active">
          <div className="navBar-home">
            <img src={logo} alt="logo" className="logo"/>
          </div>
        </NavLink>
      </div>
      <ul className="navbar">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
