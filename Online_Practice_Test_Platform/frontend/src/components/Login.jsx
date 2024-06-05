import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Auth.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { server } from "../App";
import toast from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async ({ googleAuth }) => {
    try {
      if (googleAuth) {
        const { data } = await axios.post(
          `${server}/register`,
          {
            ...googleAuth,
            password: null,
          },
          { withCredentials: true }
        );
        if (data.success) {
          navigate("/dashboard");
        }
        toast.success(data.message);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }

      const { data } = await axios.post(
        `${server}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data.success) {
        navigate("/dashboard");
      }
      toast.success(data.message);
    } catch (error) {
      console.log("Login failed:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome back</h2>
        </div>
        <div className="auth-content">
          <div className="auth-field">
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="auth-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <div className="border">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="auth-input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="auth-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="auth-remember">
            <Link to="#" className="auth-link">
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="auth-footer">
          <button className="auth-button" onClick={submitHandler}>
            Sign in
          </button>
          <div
            className="google-auth-btn"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                submitHandler({
                  googleAuth: {
                    name: decoded.name,
                    email: decoded.email,
                    googleId: credentialResponse.credential,
                    isGoogleLogin: true,
                  },
                });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <div className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
