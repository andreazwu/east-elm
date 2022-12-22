import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { useDispatch } from "react-redux"
import LoginForm from "./components/auth/LoginForm"
import SignUpForm from "./components/auth/SignUpForm"
import NavBar from "./components/Navigation/NavBar"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import UsersList from "./components/UsersList"
import User from "./components/User"
import SplashPage from "./components/SplashPage"
import ProductBrowser from "./components/Products/ProductBrowser"
import ProductDetail from "./components/Products/ProductDetail"
import MyProducts from "./components/Products/UserProducts/MyProducts"
import CreateProductForm from "./components/Products/UserProducts/CreateProductForm"
import MyReviews from "./components/Reviews/UserReviews/MyReviews"

import { authenticate } from "./store/session"

function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true)
    })()
  }, [dispatch])

  if (!loaded) {
    return null
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true} >
          <SplashPage />
        </Route>
        <Route path="/products" exact={true} >
          <ProductBrowser />
        </Route>
        <Route path="/products/:id" exact={true} >
          <ProductDetail />
        </Route>
        <Route path="/new-product" exact={true} >
          <CreateProductForm />
        </Route>
        <Route path="/my-products" exact={true} >
          <MyProducts />
        </Route>
        <Route path="/my-reviews" exact={true} >
          <MyReviews />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
