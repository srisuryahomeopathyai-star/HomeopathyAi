/** @format */

// utils/skinImageAnalyzer.js

const skinDiseaseRemedyMap = require("./brain/skin_symptoms.json");

function analyzeSkinCondition(detectedDisease) {
  // Ex: 'eczema', 'psoriasis'
  const remedies = skinDiseaseRemedyMap[detectedDisease] || [];
  return remedies;
}

module.exports = { analyzeSkinCondition };
