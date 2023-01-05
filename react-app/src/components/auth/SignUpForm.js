import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp, login } from "../../store/session";
import "./auth.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Repeat Password: Please Confirm Your Password"]);
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
          <h3>Welcome!</h3>
          <p>Please create a new account.</p>
        </div>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="validation-errors">
                {error.split(": ")[1]}
              </div>
            ))}
          </div>
          <div className="form-element">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            ></input>
          </div>
          <div className="form-element">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            ></input>
          </div>
          <div className="form-element">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </div>
          <div className="form-element">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>
          <div className="form-element">
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
            ></input>
          </div>
          <div className="form-element-button">
            <button type="submit">Sign Up</button>
            <button onClick={demoUser}>DEMO USER</button>
          </div>
        </form>
        <div className="login-page-signup">
          <span>Already a member?</span>
          <NavLink to="/login">Click here to log in</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
