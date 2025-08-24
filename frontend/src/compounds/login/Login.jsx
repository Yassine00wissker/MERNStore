import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // FontAwesome icons
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../services/Api';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await Api.post('/users/login',{
        email,
        password,
      });
      console.log("login done")
      if(rememberMe) localStorage.setItem("token", res.data.token)
      else sessionStorage.setItem("token", res.data.token)

      
      navigate("/products")

    }catch(error) {
      console.error("login error" ,error.response?.data || error.msg)
      alert("Login failed. Please check your credentials.", error.msg)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{
        backgroundImage: 'url("../../../public/images (3).jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="card shadow-sm p-4" style={{
        width: '400px',
        backgroundColor: 'rgba(86, 3, 158, 0.1)',
        backdropFilter: 'blur(5px)',
        borderRadius: '20px',
      }}>
        <h1 className="card-title text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fs-4">Email address</label>
            <input
              type="email"
              className="form-control ps-3"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fs-4">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control ps-3"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Eye icon */}
            <span
              onClick={togglePassword}
              style={{
                position: 'absolute',
                top: '55%',
                right: '12px',
                cursor: 'pointer',
                color: '#515960ff'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
          <div className='fs-5'><span className='text-muted'>alredy have an account &nbsp;<Link to={"/register"} className='text-primary fs-3' style={{ cursor: "pointer" }} >Register</Link></span></div>
        </form>
      </div>
    </div>
  );
}

export default Login;
