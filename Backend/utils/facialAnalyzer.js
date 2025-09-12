/** @format */

// utils/facialAnalyzer.js

const facialRemedyMap = require("./brain/facialRemedyData.json");

function analyzeFacialFeatures(features) {
  // Example: features = ['long narrow face', 'sunken eyes', 'dry lips']
  const matchedRemedies = {};

  features.forEach((f) => {
    const match = facialRemedyMap.find((item) => f.includes(item.feature));
    if (match) {
      match.remedies.forEach((rem) => {
        if (!matchedRemedies[rem]) matchedRemedies[rem] = 0;
        matchedRemedies[rem] += match.score || 1;
      });
    }
  });

  return matchedRemedies;
}

module.exports = { analyzeFacialFeatures };
