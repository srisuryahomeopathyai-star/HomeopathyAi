/** @format */

// brain.js - upgraded with rubric scoring, miasm detection, and explanation generator

const facial = require("./facialAnalysis");
const skin = require("./skinAnalysis");
const labs = require("./labAnalysis");
const teluguConvert = require("./teluguToEnglish");
const intercurrent = require("./intercurrentLogic");

const loadBrainFile = require("./utils/loadBrainFile"); // Load all rubric data
const rubricData = loadBrainFile(); // merged rubric object from all JSON files
const miasmMap = require("./utils/brain/miasmMap.json");

function processCase(input) {
  const mindConverted = teluguConvert(input.mindTelugu || "");
  const facialResult = facial(input.facialImage || "");
  const skinResult = skin(input.skinImage || "");
  const labResult = labs(input.labReport || {});
  const interResult = intercurrent(input.history || {});

  const rubricScores = {};
  const explanationParts = [];

  (input.rubrics || []).forEach((rubric) => {
    const grading = rubricData[rubric];
    if (grading) {
      explanationParts.push(rubric);
      for (const remedy in grading) {
        rubricScores[remedy] = (rubricScores[remedy] || 0) + grading[remedy];
      }
    }
  });

  const sortedRemedies = Object.entries(rubricScores)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);

  const topRemedy = sortedRemedies[0] || "Unknown";
  const comparisons = sortedRemedies.slice(1, 4);
  const miasm = miasmMap[topRemedy] || "Unknown";

  const explanation = explanationParts.length
    ? `${explanationParts.join(" + ")} matched most with ${topRemedy} (score: ${
        rubricScores[topRemedy]
      }).`
    : "No matching rubrics found.";

  return {
    mindEnglish: mindConverted,
    facial: facialResult,
    skin: skinResult,
    labs: labResult,
    intercurrent: interResult,
    remedy: topRemedy,
    comparison: comparisons,
    miasm: miasm,
    explanation: explanation,
  };
}

module.exports = processCase;
