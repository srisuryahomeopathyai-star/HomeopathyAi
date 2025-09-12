/** @format */

import React, { useState } from "react";
import "./Auth.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = '/cases';
      } else {
        setMessage(data.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Login</h2>

        {message && (
          <div
            style={{
              background: success ? "#d4edda" : "#f8d7da",
              color: success ? "#155724" : "#721c24",
              padding: "10px",
              marginBottom: "16px",
              borderRadius: "6px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <input
          type='email'
          name='email'
          placeholder='Email'
          required
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
          onChange={handleChange}
          value={formData.password}
        />
        <button type='submit'>Login</button>
        <p>
          Don't have an account? <a href='/register'>Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
