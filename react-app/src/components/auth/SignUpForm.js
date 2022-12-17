import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div className='form-element'>
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      {console.log(firstName, lastName, email, password)}
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
