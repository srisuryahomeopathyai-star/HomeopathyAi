/** @format */

const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "remedyExplanation.json");

// Load existing JSON
let remedies = require(filePath);

// Default dosage text (customize if needed)
const DEFAULT_DOSAGE = "30C once or twice daily (adjust per case)";

// Map through and update
remedies = remedies.map((entry) => {
  if (!entry.dosage || typeof entry.dosage !== "string") {
    return {
      ...entry,
      dosage: DEFAULT_DOSAGE,
    };
  }
  return entry;
});

// Save back to file
fs.writeFileSync(filePath, JSON.stringify(remedies, null, 2), "utf-8");

console.log("✅ Dosage field added where missing.");
