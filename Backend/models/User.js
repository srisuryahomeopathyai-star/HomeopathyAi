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
  geminiApiKey: {
    type: String,
    required: false,
  },
  trusted_device_id: {
    type: String,
    required: false,
    default: null,
  },
  otp_code: {
    type: String,
    required: false,
    default: null,
  },
  otp_expires: {
    type: Date,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
