/** @format */

// routes/analyzeCase.js or your app's main logic
const getRemediesForRubric = require("../helpers/getRemediesForRubric");

function analyzeRubric(rubricInput) {
  const result = getRemediesForRubric(rubricInput);

  if (!result) {
    return { success: false, message: "Rubric not found" };
  }

  return {
    success: true,
    rubric: rubricInput,
    grading: result,
  };
}

// // Example usage
// const result = analyzeRubric("Mouth - Ulcers inside cheek or lips");
// console.log(JSON.stringify(result, null, 2));
