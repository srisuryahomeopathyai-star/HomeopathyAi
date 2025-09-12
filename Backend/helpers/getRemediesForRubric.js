/** @format */

const { loadAllRubrics, normalize } = require("../utils/loadBrainFile");

const rubricData = loadAllRubrics();

function getRemediesFromRubrics(rubricTexts = []) {
  const result = [];

  rubricTexts.forEach((rubric) => {
    const normalized = normalize(rubric);
    const rubricInfo = rubricData[normalized];

    if (!rubricInfo || !rubricInfo.grading) {
      console.warn("❌ Rubric not found or invalid:", rubric);
      return;
    }

    const grading = rubricInfo.grading;

    Object.entries(grading).forEach(([remedy, grade]) => {
      result.push({ name: remedy, grade });
    });
  });

  return result; // ✅ Return actual result here
}

module.exports = { getRemediesFromRubrics };
