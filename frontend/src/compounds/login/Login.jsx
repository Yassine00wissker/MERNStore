import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // FontAwesome icons
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoadingPage from '../../services/LoadingPage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password, rememberMe)
      toast.success(`logged in successfully! 🎉`, {
        position: "top-right",
        autoClose: 1000, // disappears after 4s
      });
      if (loggedInUser.role === "saller") navigate("/saller");
      else if (loggedInUser.role === "buyer") navigate("/");
      else if (loggedInUser.role === "admin") navigate("/saller"); // or admin dashboard

    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }

  return (
    <>
      {!isLoaded && <LoadingPage onComplete={() => setIsLoaded(true)} />}
      <div className={`d-flex justify-content-center align-items-center vh-100 bg-light
        ${isLoaded ? "opacity-100" : "opacity-0"}
      `}
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
                required
              />
              <div className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label fs-4">Password</label>
              <input
                required
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
                  right: '12px',
                  cursor: 'pointer',
                  color: '#515960ff',
                  top: '74%',
                  transform: 'translateY(-50%)',
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
            <div className='fs-5'><span className='text-muted'>Don't have an account? &nbsp;<Link to={"/register"} className='text-primary fs-3' style={{ cursor: "pointer" }} >Register</Link></span></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
