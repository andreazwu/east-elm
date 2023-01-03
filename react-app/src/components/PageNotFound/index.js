import React from "react"
import { Link } from "react-router-dom"
import "./PageNotFound.css"

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1 className="page-not-found-title">Page Not Found</h1>
      <Link to="/products">
        <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/ecm/202253/0704/001/045.jpg" alt="page-not-found-img" />
      </Link>
    </div>
  )
}

export default PageNotFound
