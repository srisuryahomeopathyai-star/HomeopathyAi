/** @format */

// utils/labAnalyzer.js

const labInterpretationMap = require("./brain/labDiagnosisMap.json");

function interpretLabData(labValues) {
  const diagnoses = [];

  Object.entries(labValues).forEach(([test, value]) => {
    const match = labInterpretationMap[test]?.find((rule) => {
      return value >= rule.min && value <= rule.max;
    });

    if (match)
      diagnoses.push({ condition: match.diagnosis, remedies: match.remedies });
  });

  return diagnoses;
}

module.exports = { interpretLabData };
