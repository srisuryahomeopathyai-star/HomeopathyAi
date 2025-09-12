/** @format */

// services/analysisService.js
const Case = require("../models/Case");
const repertory = require("../utils/brain/rubrics_final_output.json");
const intercurrentData = require("../utils/brain/intercurrentRemedies.json");
// Step 1: Rubric extraction (no manual list, auto scan)
function extractRubrics(text) {
  const rubrics = [];
  const lower = text.toLowerCase();

  Object.keys(repertory).forEach((rubric) => {
    const rubricWords = rubric
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter(Boolean);

    // if at least 2 rubric words exist in text → consider match
    const matchCount = rubricWords.filter((w) => lower.includes(w)).length;
    if (matchCount >= 2) {
      rubrics.push(rubric);
    }
  });

  return rubrics;
}

// Step 2: Remedy scoring
function scoreRemedies(rubrics) {
  const scores = {};

  rubrics.forEach((r) => {
    const rubricData = repertory[r];
    if (!rubricData) return;

    if (rubricData.high) {
      rubricData.high.forEach((rem) => {
        scores[rem] = (scores[rem] || 0) + 3;
      });
    }
    if (rubricData.medium) {
      rubricData.medium.forEach((rem) => {
        scores[rem] = (scores[rem] || 0) + 2;
      });
    }
    if (rubricData.low) {
      rubricData.low.forEach((rem) => {
        scores[rem] = (scores[rem] || 0) + 1;
      });
    }
  });

  return Object.entries(scores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score);
}

// Step 3: Main re-analysis function
async function reanalyzeCase(caseId) {
  const caseData = await Case.findById(caseId);
  if (!caseData) throw new Error("Case not found");

  // Collect symptoms (Mind + Physical + General)
  const symptoms = [
    ...caseData.mindSymptoms,
    ...caseData.physicalSymptoms,
    ...(caseData.generalSymptoms || []),
  ];

  // Score remedies from repertory
  let remedyScores = {};
  symptoms.forEach((symptom) => {
    if (repertoryData[symptom]) {
      repertoryData[symptom].forEach((remedy) => {
        remedyScores[remedy] = (remedyScores[remedy] || 0) + 1;
      });
    }
  });
  // Sort remedies by score
  const sortedRemedies = Object.entries(remedyScores)
    .sort((a, b) => b[1] - a[1])
    .map(([remedy, score]) => ({ remedy, score }));

  // Add intercurrent remedies if needed
  const intercurrents = [];
  intercurrentData.forEach((r) => {
    if (symptoms.includes(r.keySymptom)) {
      intercurrents.push(r.name);
    }
  });

  return {
    caseId,
    remedies: sortedRemedies.slice(0, 10), // top 10
    intercurrentSuggestions: intercurrents,
    reasoning:
      "Generated based on repertory analysis and intercurrent indications.",
  };
}

module.exports = { reanalyzeCase };
