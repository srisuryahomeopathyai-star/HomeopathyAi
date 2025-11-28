/** @format */

// /** @format */

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("User", userSchema);
/** @format */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add Gemini/Google API key for each user
  geminiApiKey: {
    type: String,
    required: false, // optional, user can add later
  },
});

module.exports = mongoose.model("User", userSchema);
