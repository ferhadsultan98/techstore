import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "../../../server/server.jsx"; // Adjusted import path
import "../../Styles/Login.scss";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      onLogin(); // Update authentication state in App.jsx
      navigate("/home"); // Navigate to home route
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2>Welcome Back</h2>
        {error && <div className="errorMessage">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="loginBtn" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
