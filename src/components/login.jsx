/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/login.css';

const Login = () => {
  return (
    <div className='login-container'>
      <form className='login-form'>
        <h1>LOGIN</h1>
        <p>Please enter your login and password!</p>
        <input type='email' placeholder='Email' required />
        <input type='password' placeholder='Password' required />
        <button type='submit'>LOGIN</button>
        <p className='forgot-password'>Forgot password?</p>
      </form>
    </div>
  );
};
export default Login;
