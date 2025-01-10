import React, { useState } from 'react';
import '../styles/login.css';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.baseURL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(
          data.message || 'User created successfully',
          {
            position: 'top-center',
          },
          setTimeout(() => {
            navigate('/');
          }, 2000)
        );
        // Redirect to login page
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Login failed', {
          position: 'top-center',
        });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.', {
        position: 'top-center',
      });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
        <p>Please create your account by filling the form below!</p>
        <input
          placeholder='Name'
          value={name}
          onChange={handleNameChange}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type='submit'>SIGN UP</button>
        <p className='forgot-password'>
          Already have an account?
          <Link to='/' className='text-white-50 fw-bold'>
            Login
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
