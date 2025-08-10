import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.form?.pathname || "/dashboard";

  const validate = () => {
    const e = {}
    if(!/\s+@+\s+\.\s+/.test(email)){
      e.email = "Enter a valid email";
    }
    if(password.length < 6) e.password = "Password must be 6+ chars";
    setError(e);
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()) return;
    setLoading(true);
    const res = await login(email, password, remember);
    setLoading(false)
    if(res.ok) navigate(from, { replace: true });
    else setError({ server: res.message || "Login failed"})
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-envelope-fill text-primary"></i>
              </span>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="invalid-feedback">{error.email}</div>
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-lock-fill text-primary"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
               <span className="input-group-text bg-white" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
              </span>
              <div className="invalid-feedback">{errors.password}</div>
            </div>
          </div>

          {/* Remember me */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            style={{ transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0b5ed7")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "")}
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none text-primary fw-semibold">
              Sign Up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
