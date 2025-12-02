import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import LoadingPage from '../../services/LoadingPage';
import ThemeToggle from '../../components/ThemeToggle';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { login } = useContext(AuthContext);
  const { theme } = useTheme();
  // Load remembered email from localStorage
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('rememberedEmail') || '';
  });
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  // Load rememberMe state from localStorage
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('rememberMe') === 'true';
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password, rememberMe)
      
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberMe');
      }
      
      toast.success(`logged in successfully! 🎉`, {
        position: "top-right",
        autoClose: 1000,
      });
      if (loggedInUser.role === "seller") navigate("/seller");
      else if (loggedInUser.role === "buyer") navigate("/");
      else if (loggedInUser.role === "admin") navigate("/admin");
      
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
            maxWidth: '450px',
            backgroundColor: 'var(--card-bg)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 60px var(--card-shadow)',
            zIndex: 1,
            transition: 'all 0.3s ease',
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
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Sign in to continue to MERN Store
            </p>
          </div>
          <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    cursor: 'pointer',
                    width: '18px',
                    height: '18px',
                  }}
                />
                <label 
                  className="form-check-label" 
                  htmlFor="rememberMe"
                  style={{ 
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  Remember me
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn w-100"
              style={{
                padding: '14px',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                border: 'none',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              }}
            >
              Sign In
            </button>
            
            <div className="text-center mt-4">
              <span style={{ color: 'var(--text-secondary)' }}>
                Don't have an account?{' '}
                <Link 
                  to={"/register"} 
                  style={{ 
                    color: 'var(--primary-color)',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                >
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
