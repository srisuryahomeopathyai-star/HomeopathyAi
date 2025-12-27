/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/middleware");
// const nodemailer = require("nodemailer");
const { Resend } = require("resend"); // Import Resend at the top
const resend = new Resend(process.env.RESEND_API_KEY);
const crypto = require("crypto");
// ---------------- API Key Management ------------------

// Get current user's API key
router.get("/apikey", middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("geminiApiKey");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ geminiApiKey: user.geminiApiKey || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add or update API key
router.put("/apikey", middleware, async (req, res) => {
  try {
    const { geminiApiKey } = req.body;
    if (!geminiApiKey)
      return res.status(400).json({ message: "API key is required" });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { geminiApiKey },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "API key saved successfully",
      geminiApiKey: user.geminiApiKey,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/update-api-key", middleware, async (req, res) => {
  try {
    let { apiKey } = req.body;

    if (!apiKey || typeof apiKey !== "string")
      return res.status(400).json({ message: "API key is required" });

    apiKey = apiKey.trim();
    if (!apiKey)
      return res.status(400).json({ message: "API key cannot be empty" });

    // Optional: basic format check
    if (!/^AIza[0-9A-Za-z-_]{35}$/.test(apiKey)) {
      return res.status(400).json({ message: "API key format looks invalid" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { geminiApiKey: apiKey },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "API key updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete API key
router.delete("/update-api-key", middleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $unset: { geminiApiKey: 1 } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "API key deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const { email, password, trustedDeviceId } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Handle Trusted Device (Standard Login)
    if (user.trusted_device_id && trustedDeviceId === user.trusted_device_id) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
        trusted: true,
      });
    }

    // --- OTP GENERATION ---
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Save exactly this 'otp' to your DB
    user.otp_code = otp;
    user.otp_expires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    // --- SENDING TO YOUR PERSONAL GMAIL ---
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        await resend.emails.send({
          from: "Auth-System <onboarding@resend.dev>",
          to: adminEmail, // This is your personal Gmail
          subject: "Admin OTP Verification",
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
              <h2>Login Attempt Detected</h2>
              <p>User <strong>${user.email}</strong> is trying to log in from a new device.</p>
              <p>The OTP saved to your database is:</p>
              <h1 style="color: #4A90E2; letter-spacing: 5px;">${otp}</h1>
              <p>This code will expire in 5 minutes.</p>
            </div>
          `,
        });
        console.log("OTP successfully sent to admin Gmail via Resend API");
      } catch (e) {
        console.error("Resend API Error:", e.message);
      }
    }

    return res.json({
      otp_required: true,
      message: "New device detected. OTP sent to admin.",
    });
  } catch (err) {
    console.error("Login Route Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, trustedDeviceId } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid user" });

    if (!user.otp_code || !user.otp_expires || user.otp_code !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    if (new Date() > new Date(user.otp_expires)) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    user.trusted_device_id = trustedDeviceId || null;
    user.otp_code = null;
    user.otp_expires = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
      trusted: true,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // For security, don't reveal if a user exists. Just say "Check your email"
      return res
        .status(200)
        .json({ msg: "If that email exists, an OTP has been sent." });
    }

    // Generate a 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Set expiry (e.g., 15 minutes)
    user.otp_code = otp;
    user.otp_expires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    // Send the OTP via Resend
    await resend.emails.send({
      from: "Auth-System <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL, // Since you are in test mode, send it to yourself
      subject: "Password Reset OTP",
      html: `<h3>Password Reset Request</h3>
             <p>A request was made to reset the password for <strong>${email}</strong>.</p>
             <p>The Reset OTP is: <strong>${otp}</strong></p>
             <p>This code expires in 15 minutes.</p>`,
    });

    res.status(200).json({ msg: "OTP sent to admin email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ---------------- 2. RESET PASSWORD ----------------
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid request" });

    // Check if OTP is valid and not expired
    if (!user.otp_code || user.otp_code !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    if (new Date() > new Date(user.otp_expires)) {
      return res.status(400).json({ msg: "OTP has expired" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields so they can't be used again
    user.otp_code = null;
    user.otp_expires = null;
    await user.save();

    res
      .status(200)
      .json({ msg: "Password updated successfully. You can now login." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
