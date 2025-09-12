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
const mongoose = require("mongoose");

const chiefComplaintSchema = new mongoose.Schema({
  complaint: String,
  duration: String,
  description: String,
  modalities: String,
  skinImage: String,
});

const prescriptionSchema = new mongoose.Schema({
  date: Date,
  remedyName: String,
  potency: String,
  dose: String,
  instructions: String,
});

const pastHistorySchema = new mongoose.Schema({
  childhoodDiseases: String,
  surgeriesInjuries: String,
  majorIllnesses: String,
});

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

const CaseSchema = new mongoose.Schema({
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
  chiefComplaints: [chiefComplaintSchema],
  prescription: {
    type: [prescriptionSchema],
    default: [],
  },
  labInvestigation: {
    type: mongoose.Schema.Types.Mixed, // or Object / String depending on structure
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
