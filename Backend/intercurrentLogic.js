// module.exports = function checkIntercurrentNeeds(history) {
//   const result = { needed: false, remedy: null, reason: "" };

//   if (history.pastSuppression) {
//     result.needed = true;
//     result.remedy = "Sulphur";
//     result.reason = "Suppressed skin conditions in past.";
//   } else if (history.familyHistory?.includes("tuberculosis")) {
//     result.needed = true;
//     result.remedy = "Tuberculinum";
//     result.reason = "Tubercular family history.";
//   }

//   return result;
// };
const rules = require("../Backend/utils/brain/intercurrent remedys.json");

function getValueByPath(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

module.exports = function checkIntercurrentNeeds(history) {
  const results = [];

  for (const rule of rules) {
    const value = getValueByPath(history, rule.key);

    const match =
      (rule.hasOwnProperty("value") && value === rule.value) ||
      (rule.includes && Array.isArray(value) && value.includes(rule.includes)) ||
      (rule.includes &&
        typeof value === "string" &&
        value.toLowerCase().includes(rule.includes.toLowerCase()));

    if (match) {
      results.push({
        remedy: rule.remedy,
        reason: rule.reason
      });
    }
  }

  if (results.length > 0) {
    return {
      needed: true,
      remedies: results.map(r => r.remedy),
      reasons: results.map(r => r.reason)
    };
  }

  return {
    needed: false,
    remedies: [],
    reasons: []
  };
};
