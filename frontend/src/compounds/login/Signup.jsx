import React from 'react'
import Api from '../../services/Api.jsx';
import { useState } from 'react';

function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await Api.post('/users/register',
        {
          name,
          email,
          password,
        }
      )
      console.log("register success")
    } catch (error) {
      console.error(error.response?.data?.msg || "Registration failed!")
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{
        backgroundImage: 'url("../../../public/images (3).jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="card shadow-sm p-4" style={{
        width: '400px',
        backgroundColor: 'rgba(86, 3, 158, 0.1)',
        backdropFilter: 'blur(5px)',
        borderRadius: '20px',
      }}>
        <h1 className="card-title text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">Name</label>
            <input
              type="text"
              className="form-control ps-3"
              id="name"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fs-4">Email address</label>
            <input
              type="email"
              className="form-control ps-3"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fs-4">Password</label>
            <input
              type='password'
              className="form-control ps-3"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fs-4">Confirm Password</label>
            <input
              type='password'
              className="form-control ps-3"
              id="confirmPassword"
              placeholder="confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-info w-100 mt-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup