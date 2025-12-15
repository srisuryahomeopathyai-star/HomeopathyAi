/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/middleware");
const nodemailer = require("nodemailer");

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

    if (user.trusted_device_id && trustedDeviceId === user.trusted_device_id) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
        trusted: true,
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.otp_code = otp;
    user.otp_expires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        const axios = require("axios");
        const resendKey = process.env.RESEND_API_KEY;
        const sendgridKey = process.env.SENDGRID_API_KEY;
        const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || adminEmail;
        const subject = "Untrusted device login attempt";
        const text = `New login attempt for user ${user.email} from an unregistered device. OTP is ${otp}.`;

        if (resendKey) {
          await axios.post(
            "https://api.resend.com/emails",
            { from: fromEmail, to: adminEmail, subject, text },
            {
              headers: { Authorization: `Bearer ${resendKey}` },
              timeout: Number(process.env.EMAIL_HTTP_TIMEOUT_MS || 10000),
            }
          );
        } else if (sendgridKey) {
          await axios.post(
            "https://api.sendgrid.com/v3/mail/send",
            {
              personalizations: [{ to: [{ email: adminEmail }] }],
              from: { email: fromEmail },
              subject,
              content: [{ type: "text/plain", value: text }],
            },
            {
              headers: {
                Authorization: `Bearer ${sendgridKey}`,
                "Content-Type": "application/json",
              },
              timeout: Number(process.env.EMAIL_HTTP_TIMEOUT_MS || 10000),
            }
          );
        } else {
          const transporter = nodemailer.createTransport(
            process.env.SMTP_SERVICE
              ? {
                  service: process.env.SMTP_SERVICE,
                  auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                  },
                  pool: true,
                  maxConnections: 1,
                  maxMessages: 10,
                  connectionTimeout: Number(process.env.SMTP_CONN_TIMEOUT_MS || 15000),
                  socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT_MS || 15000),
                  greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT_MS || 5000),
                  requireTLS: true,
                  tls: { minVersion: "TLSv1.2" },
                }
              : {
                  host: process.env.SMTP_HOST || "smtp.gmail.com",
                  port: Number(process.env.SMTP_PORT || 587),
                  secure:
                    String(process.env.SMTP_SECURE).toLowerCase() === "true" ||
                    Number(process.env.SMTP_PORT || 0) === 465,
                  auth: process.env.SMTP_USER && process.env.SMTP_PASS
                    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
                    : undefined,
                  pool: true,
                  maxConnections: 1,
                  maxMessages: 10,
                  connectionTimeout: Number(process.env.SMTP_CONN_TIMEOUT_MS || 15000),
                  socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT_MS || 15000),
                  greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT_MS || 5000),
                  requireTLS: true,
                  tls: { minVersion: "TLSv1.2" },
                }
          );
          await transporter.verify().catch(() => {});
          await transporter.sendMail({
            from: fromEmail,
            to: adminEmail,
            subject,
            text,
          });
        }
      } catch (e) {
        console.error("Email error:", {
  message: e.message,
  response: e.response?.data,
});

      }
    } else {
      console.log(`Admin OTP for ${user.email}: ${otp}`);
    }

    return res.json({
      otp_required: true,
      message: "New device detected. OTP sent to admin.",
    });
  } catch (err) {
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

module.exports = router;
