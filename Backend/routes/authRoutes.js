/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/middleware");

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
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
