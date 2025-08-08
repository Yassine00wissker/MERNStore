import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-body-tertiary">
      <form
        className="shadow bg-light p-5 rounded"
        style={{ width: '100%', maxWidth: '400px' }}
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-center">Login</h1>

        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>

        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
