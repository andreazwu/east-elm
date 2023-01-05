import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import "./auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@user.io", "dimidue"));
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page-cover">
      <div className="login-page-content">
        <div className="login-page-title">
          <h3>Welcome back!</h3>
          <p>Please log in with your email.</p>
        </div>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="validation-errors">
                {error.split(": ")[1]}
              </div>
            ))}
          </div>
          <div className="form-element">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="form-element-button">
              <button type="submit">Log In</button>
              <button onClick={demoUser}>DEMO USER</button>
            </div>
          </div>

          <div className="login-page-signup">
            <span>Don't have an account?</span>
            <NavLink to="/signup">Click here to sign up</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
