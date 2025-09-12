/** @format */

import React, { useState } from "react";
import "./Auth.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage("Registration successful!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage(data.msg || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Create Account</h2>
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
          type='text'
          name='name'
          placeholder='Full Name'
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          required
          onChange={handleChange}
        />
        <button type='submit'>Register</button>
        <p>
          Already have an account? <a href='/login'>Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
