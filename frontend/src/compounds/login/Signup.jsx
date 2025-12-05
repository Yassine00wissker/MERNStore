import React from 'react'
import Api from '../../services/Api.jsx';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoadingPage from '../../services/LoadingPage.jsx';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    
    setLoading(true);
    try {
      const res = await Api.post('/users/register',
        {
          name,
          email,
          password,
        }
      )
      console.log("register success", res.data)
      toast.success("Registration successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.msg || error.response?.data?.message || error.message || "Registration failed! Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!isLoaded && <LoadingPage onComplete={() => setIsLoaded(true)} />}
      <div 
        className={`d-flex justify-content-center align-items-center vh-100
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #1a0d3a 0%, #2d1b69 50%, #1a0d3a 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background particles */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}>
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: theme === 'dark'
                  ? '0 0 10px rgba(255, 255, 255, 0.2)'
                  : '0 0 10px rgba(255, 255, 255, 0.4)',
              }}
            />
          ))}
        </div>
        
        {/* Animated gradient orbs */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(77, 171, 247, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          top: '-250px',
          left: '-250px',
          animation: 'orbFloat 20s ease-in-out infinite',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          bottom: '-200px',
          right: '-200px',
          animation: 'orbFloat 25s ease-in-out infinite reverse',
          zIndex: 0,
        }} />

        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { 
              transform: translateY(0) translateX(0) scale(1); 
              opacity: 0.3; 
            }
            25% { 
              transform: translateY(-30px) translateX(10px) scale(1.1); 
              opacity: 0.6; 
            }
            50% { 
              transform: translateY(-60px) translateX(-10px) scale(1.2); 
              opacity: 0.8; 
            }
            75% { 
              transform: translateY(-30px) translateX(10px) scale(1.1); 
              opacity: 0.6; 
            }
          }
          @keyframes orbFloat {
            0%, 100% { 
              transform: translate(0, 0) scale(1); 
            }
            33% { 
              transform: translate(50px, 50px) scale(1.1); 
            }
            66% { 
              transform: translate(-30px, 30px) scale(0.9); 
            }
          }
        `}</style>

        <div 
          className="card shadow-lg p-4" 
          style={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: 'var(--card-bg)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 60px var(--card-shadow)',
            zIndex: 1,
            transition: 'all 0.3s ease',
            margin: '20px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 25px 70px var(--card-shadow)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 60px var(--card-shadow)';
          }}
        >
          <div className="text-center mb-4">
            <h1 
              className="mb-2" 
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Create Account
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Join MERN Store and start shopping today
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label" style={{ 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: '12px 16px',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '2px solid var(--input-border)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13, 110, 253, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label" style={{ 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '12px 16px',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '2px solid var(--input-border)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13, 110, 253, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <div className="form-text" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-4 position-relative">
              <label htmlFor="password" className="form-label" style={{ 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Password
              </label>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '12px 45px 12px 16px',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '2px solid var(--input-border)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13, 110, 253, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <span
                onClick={togglePassword}
                style={{
                  position: 'absolute',
                  right: '16px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  top: '42px',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="mb-4 position-relative">
              <label htmlFor="confirmPassword" className="form-label" style={{ 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Confirm Password
              </label>
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  padding: '12px 45px 12px 16px',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '2px solid var(--input-border)',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13, 110, 253, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--input-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <span
                onClick={toggleConfirmPassword}
                style={{
                  position: 'absolute',
                  right: '16px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  top: '42px',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button 
              type="submit" 
              className="btn w-100"
              disabled={loading}
              style={{
                padding: '14px',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '12px',
                background: loading 
                  ? 'var(--bg-secondary)' 
                  : 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                border: 'none',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <div className="text-center mt-4">
              <span style={{ color: 'var(--text-secondary)' }}>
                Already have an account?{' '}
                <Link 
                  to={"/login"} 
                  style={{ 
                    color: 'var(--primary-color)',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                >
                  Sign In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup