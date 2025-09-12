const fs = require("fs");
const path = require("path");

// Load remedies from JSON file
const remedies = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "./utils/brain/intercurrentRemedies.json"),
    "utf-8"
  )
);

/**
 * Checks the patient summary text and returns a matched intercurrent remedy if found.
 * @param {string} patientSummaryText - Free-text summary of patient case.
 * @returns {object} - Matched remedy object or default "not found" response.
 */
function checkIntercurrentRemedy(patientSummaryText = "") {
  const lowerSummary = patientSummaryText.toLowerCase();

  for (const remedy of remedies) {
    const whenToUse =
      remedy.whenToUse || remedy.when_to_use || remedy.when_to_use || [];

    if (!whenToUse.length) continue;

    const matched = whenToUse.some((condition) => {
      const keyword = condition.split(" ")[0].toLowerCase(); // simple keyword match
      return lowerSummary.includes(keyword);
    });

    if (matched) {
      return {
        remedy: remedy.remedy,
        miasm: remedy.miasm,
        reason: whenToUse,
        keyIndications: remedy.keyIndications || remedy.key_indications || [],
      };
    }
  }

  return {
    remedy: null,
    reason: "No matching intercurrent condition found.",
  };
}

// ✅ Export for use in other files
module.exports = checkIntercurrentRemedy;
