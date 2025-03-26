"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/login.css"; // Import CSS file
import { Cookie } from "next/font/google";


const Login = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login/signup
  const [email, setEmail] = useState(""); // Changed username to email for API
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      // Signup logic (You need to create an API for signup)
      alert("Signup API not implemented yet.");
    } else {
      // Login API call
      try {
        const res = await fetch("api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        console.log(data)

        localStorage.setItem("token", data.token);
        // Successful login, redirect to home
        alert("Login successful!");
        router.push("/home");

      } catch (error) {
        setError(error.message);
      }
     
      
    }
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h2 className="logo">Instagram</h2>
        {error && <p className="error">{error}</p>} 
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button className="loginBtn" onClick={handleAuth}>
          {isSignup ? "Sign Up" : "Log In"}
        </button>

        <div className="orSection">
          <div className="line"></div>
          <span>OR</span>
          <div className="line"></div>
        </div>

        <div className="fbLogin">
          <span>🔵 Log in with Facebook</span>
        </div>

        <p className="forgotPassword">Forgotten your password?</p>
      </div>

      <div className="signupBox">
        <p>
          {isSignup
            ? "Already have an account? "
            : "Don't have an account? "}
          <span className="signup" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Log in" : "Sign up"}
          </span>
        </p>
      </div>

      <div className="getApp">
        <p>Get the app.</p>
        <div className="appButtons">
          <img src="/google-play.png" alt="Google Play" />
          <img src="/microsoft.png" alt="Microsoft Store" />
        </div>
      </div>
    </div>
  );
};

export default Login;
