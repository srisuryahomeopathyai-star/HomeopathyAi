/** @format */

// utils/remedySelector.js

function analyzeRubrics(rubrics) {
  const remedyScore = {};

  rubrics.forEach((rubric) => {
    const remedyMap = rubric.remedies;

    for (const [remedy, grade] of Object.entries(remedyMap)) {
      if (!remedyScore[remedy]) remedyScore[remedy] = 0;

      // Optionally multiply by rubric.score if weighted
      remedyScore[remedy] += grade * (rubric.score || 1);
    }
  });

  const sortedRemedies = Object.entries(remedyScore)
    .sort((a, b) => b[1] - a[1])
    .map(([remedy, score]) => ({ remedy, score }));

  return sortedRemedies;
}

module.exports = { analyzeRubrics };
