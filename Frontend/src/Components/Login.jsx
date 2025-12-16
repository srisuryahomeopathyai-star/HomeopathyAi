/** @format */

import React, { useState } from "react";
import "./Auth.css";

const API_URL = import.meta.env.VITE_API_URL || "";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
  });
  const [otpMode, setOtpMode] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const getOrCreateDeviceId = () => {
    let id = localStorage.getItem("trusted_device_id");
    if (!id) {
      id =
        window.crypto && window.crypto.randomUUID
          ? window.crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem("trusted_device_id", id);
    }
    return id;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    try {
      const trustedDeviceId = getOrCreateDeviceId();
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          trustedDeviceId,
        }),
      });

      const data = await res.json();

      if (data.otp_required) {
        setOtpMode(true);
        setMessage(
          "Untrusted device: OTP sent to admin. Please enter OTP provided by admin."
        );
        return;
      }

      if (res.ok && data.token) {
        setSuccess(true);
        setMessage("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/cases";
      } else {
        setMessage(data.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  const handleRequestReset = async () => {
    if (!formData.email) return setMessage("Please enter your email first");
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpMode(true);
        setMessage("Reset OTP sent to admin email.");
      } else {
        setMessage(data.msg || "Error sending OTP");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp,
          newPassword: formData.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setMessage("Password reset successful! You can now login.");
        setForgotMode(false);
        setOtpMode(false);
        setOtp("");
      } else {
        setMessage(data.msg || "Reset failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const trustedDeviceId = getOrCreateDeviceId();
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp, trustedDeviceId }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess(true);
        setMessage("Login successful!");
        setOtpMode(false);
        window.location.href = "/cases";
      } else {
        setMessage(data.msg || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className='auth-container'>
      <form
        className='auth-form'
        onSubmit={forgotMode ? handleResetPassword : handleSubmit}
      >
        <h2>{forgotMode ? "Reset Password" : "Login"}</h2>

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

        {!forgotMode ? (
          <>
            <input
              type='password'
              name='password'
              placeholder='Password'
              required
              onChange={handleChange}
              value={formData.password}
            />
            {!otpMode ? (
              <>
                <button type='submit'>Login</button>
                <p style={{ textAlign: "right", marginTop: "10px" }}>
                  <span
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                    onClick={() => {
                      setForgotMode(true);
                      setMessage("");
                    }}
                  >
                    Forgot Password?
                  </span>
                </p>
              </>
            ) : (
              <div style={{ marginTop: "10px" }}>
                <input
                  type='text'
                  placeholder='Enter OTP'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type='button' onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ marginTop: "10px" }}>
            {!otpMode ? (
              <>
                <button type='button' onClick={handleRequestReset}>
                  Send Reset OTP
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setForgotMode(false);
                    setMessage("");
                  }}
                  style={{ background: "gray", marginTop: "5px" }}
                >
                  Back to Login
                </button>
              </>
            ) : (
              <>
                <input
                  type='password'
                  name='newPassword'
                  placeholder='Enter New Password'
                  onChange={handleChange}
                  value={formData.newPassword}
                  required
                />
                <input
                  type='text'
                  placeholder='Enter OTP'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type='submit'>Reset Password</button>
                <button
                  type='button'
                  onClick={() => setOtpMode(false)}
                  style={{ background: "gray", marginTop: "5px" }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}

        {!forgotMode && (
          <p>
            Don't have an account? <a href='/register'>Register</a>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
