/** @format */

// const caseSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   gender: String,
//   phone: String,
//   dateOfVisit: Date,
//   chiefComplaints: [
//     {
//       complaint: String,
//       duration: String,
//       description: String,
//     }
//   ],
//   // Add other fields as needed similarly...
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
// models/Case.js
/** @format */

const mongoose = require("mongoose");

// ---------------------- Chief Complaint ----------------------
const chiefComplaintSchema = new mongoose.Schema({
  complaint: String,
  duration: String,
  description: String,
  modalities: String,
  skinImage: String,
});

// ---------------------- Prescription -------------------------
const prescriptionSchema = new mongoose.Schema({
  date: Date,
  remedyName: String,
  potency: String,
  dose: String,
  instructions: String,
});

// ---------------------- Past History -------------------------
const pastHistorySchema = new mongoose.Schema({
  childhoodDiseases: String,
  surgeriesInjuries: String,
  majorIllnesses: String,
});

// ---------------------- Personal History ---------------------
const personalHistorySchema = new mongoose.Schema({
  appetite: String,
  cravingsAversions: String,
  thirst: String,
  bowel: String,
  urine: String,
  sleep: String,
  dreams: String,
  sweat: String,
  thermal: String,
  habits: String,
  menstrual: String,
});

// ---------------------- Case Schema --------------------------
const CaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: String,
  phone: String,
  age: Number,
  gender: String,
  maritalStatus: String,
  symptoms: String,

  remedyGiven: {
    type: String,
    default: "",
  },

  aiRemedyGiven: { type: String },

  dateOfVisit: Date,
  imageUrl: String,

  // Chief complaints (array)
  chiefComplaints: {
    type: [chiefComplaintSchema],
    default: [],
  },

  // Prescription list
  prescription: {
    type: [prescriptionSchema],
    default: [],
  },

  // Lab investigation JSON
  labInvestigation: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },

  pastHistory: pastHistorySchema,
  personalHistory: personalHistorySchema,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Case", CaseSchema);
