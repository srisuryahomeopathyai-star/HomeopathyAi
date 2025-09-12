/** @format */

// /** @format */
// const mongoose = require("mongoose");

// const followUpSchema = new mongoose.Schema({
//   patientId: String,
//   patientName: String,
//   phoneNumber: String, // <-- add this
//   date: String, // YYYY-MM-DD
//   complaint: String,
//   complaints: String,
//   prescription: String,
//   remarks: String,
//   // Add other fields as needed
// });

// module.exports = mongoose.model("FollowUp", followUpSchema);
// /** @format */

// const mongoose = require("mongoose");

// const followUpSchema = new mongoose.Schema({
//   patientId: {
//     type: String,
//     required: false, // change to true if you always want this
//   },
//   patientName: {
//     type: String,
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: false,
//   },
//   date: {
//     type: String, // keep as string if you're using YYYY-MM-DD manually
//     required: true,
//   },
//   complaint: {
//     type: String,
//     required: false,
//   },
//   complaints: {
//     type: String,
//     required: false,
//   },
//   prescription: {
//     type: String,
//     required: false,
//   },
//   remarks: {
//     type: String,
//     required: false,
//   },
// }, {
//   timestamps: true // optional: adds createdAt and updatedAt
// });

// module.exports = mongoose.model("FollowUp", followUpSchema);
const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema({
  casesId: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },
  patientName: String,
  phoneNumber: String,
  complaint: String,
  prescription: String,
  remarks: String,
  date: { type: String, required: true },
  reliefStatus: {
    type: String,
    enum: ["Full Relief", "Partial Relief", "No Relief"],
    default: "Partial Relief",
  },
  analysis: { type: Object }, // AI analysis result
});

module.exports = mongoose.model("FollowUp", followUpSchema);
