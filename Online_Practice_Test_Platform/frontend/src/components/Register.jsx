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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitHandler = async ({ googleAuth }) => {
    try {
      let Email = email;
      let Name = name;
      let googleId = null;
      let isGoogleLogin = false;
      let Password = password;

      if (googleAuth) {
        Email = googleAuth.email;
        Name = googleAuth.name;
        isGoogleLogin = true;
        googleId = googleAuth.googleId;
        Password = "";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(Email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      if (Password.length < 8 && !isGoogleLogin) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }

      if (!Name.trim()) {
        toast.error("Please enter your name.");
        return;
      }

      const { data } = await axios.post(
        `${server}/register`,
        {
          name: Name,
          email: Email,
          password: Password,
          googleId: googleId,
          isGoogleLogin: isGoogleLogin,
        },
        { withCredentials: true }
      );
      if (data.success) {
        navigate("/dashboard");
      }
      toast.success(data.message);
    } catch (error) {
      console.log("Registration failed:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create an account</h2>
        </div>
        <div className="auth-content">
          <div className="auth-field">
            <label htmlFor="name" className="auth-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="auth-input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
        </div>
        <div className="auth-footer">
          <button className="auth-button" onClick={submitHandler}>
            Sign up
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
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
