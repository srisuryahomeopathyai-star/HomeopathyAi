/** @format */

const getRemediesForRubric = require("../helpers/getRemediesForRubric");

const inputRubric = "Mouth - Ulcers inside cheek or lips";
const result = getRemediesForRubric(inputRubric);

console.log("🎯 Query Rubric:", inputRubric);
console.log(JSON.stringify(result, null, 2));
