// // const remedyExplanation = require("../utils/brain/remedyExplanation.json");
// // const { brainData } = require("../utils/brainLogic");
// // const stringSimilarity = require("string-similarity");

// // function extractRubricsFromCase(caseInput) {
// //   if (!brainData || !Array.isArray(brainData)) {
// //     console.error("❌ brainData is not loaded or not an array");
// //     return [];
// //   }

// //   const text = Object.values(caseInput || {})
// //     .join(" ")
// //     .toLowerCase();

// //   const words = text
// //     .split(/[,.;\n]/)
// //     .map((s) => s.trim())
// //     .filter(Boolean);

// //   const allRubrics = brainData
// //     .map((entry) => entry.rubric)
// //     .filter((r) => typeof r === "string" && r.trim() !== "");

// //   const matches = new Set();

// //   words.forEach((userPhrase) => {
// //     const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
// //     bestMatch.ratings.forEach((match) => {
// //       if (match.rating > 0.3) {
// //         matches.add(match.target);
// //       }
// //     });
// //   });

// //   return Array.from(matches);
// // }
// // function getExplanation(remedyName, matchedRubrics) {
// //   const explanationEntry = remedyExplanation[remedyName];
// //   if (!explanationEntry) {
// //     return `No classical explanation found for ${remedyName}.`;
// //   }

// //   // Find rubrics matched that are mentioned in explanation symptoms (if available)
// //   const relatedRubrics = matchedRubrics.filter((r) =>
// //     explanationEntry.symptoms?.some((symptom) =>
// //       r.toLowerCase().includes(symptom.toLowerCase())
// //     )
// //   );

// //   const rubricsToShow =
// //     relatedRubrics.length > 0
// //       ? relatedRubrics.join(", ")
// //       : matchedRubrics.slice(0, 3).join(", ");

// //   return `Selected because ${remedyName} covers: ${rubricsToShow}. ${
// //     explanationEntry.reason || ""
// //   }`;
// // }


// // exports.analyzeCase = (req, res) => {
// //   const { rubrics, caseInput } = req.body;
// //   console.log("✅ req.body =", req.body);
// //   console.log("✅ rubrics =", req.body.rubrics);
// //   console.log("✅ caseInput =", req.body.caseInput);

// //   let finalRubrics = rubrics || [];

// //   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
// //     finalRubrics = extractRubricsFromCase(caseInput);
// //   }

// //   console.log("📩 Incoming caseInput:", caseInput);
// //   console.log("🔍 Rubrics used:", finalRubrics);

// //   if (!finalRubrics.length) {
// //     return res
// //       .status(400)
// //       .json({ error: "No rubrics or valid caseInput found." });
// //   }

// //   if (!brainData || !Array.isArray(brainData)) {
// //     console.error("❌ brainData is not properly loaded");
// //     return res
// //       .status(500)
// //       .json({ error: "Internal error: brain data not available." });
// //   }

// //   const remedyScore = {};

// //   brainData.forEach((entry) => {
// //     if (finalRubrics.includes(entry.rubric)) {
// //       if (entry.remedies && Array.isArray(entry.remedies)) {
// //         entry.remedies.forEach(({ name, grade }) => {
// //           if (!remedyScore[name]) remedyScore[name] = 0;
// //           remedyScore[name] += grade;
// //         });
// //       }
// //     }
// //   });

// //   const sorted = Object.entries(remedyScore)
// //     .sort((a, b) => b[1] - a[1])
// //     .map(([name, score]) => ({ name, score }));

// //   console.log("🏁 Final remedies:", sorted.slice(0, 10));

// //   res.json({
// //     inputRubrics: finalRubrics,
// //     topRemedies: sorted.slice(0, 10),
// //     main_remedy: sorted[0]?.name || "N/A",
// //     dosage: "1M once daily",
// //     analysis: "Based on dominant mind and physical rubrics",
// //     pioneer_explanation: `Selected based on rubric match: ${finalRubrics
// //       .slice(0, 3)
// //       .join(", ")}`,
// //   });
// // };
// // exports.searchRubrics = (req, res) => {
// //   const query = req.query.q?.toLowerCase() || "";
// //   const matches = brainData
// //     .map((entry) => entry.rubric)
// //     .filter((rubric) => rubric.toLowerCase().includes(query));
// //   res.json({ results: matches });
// // };

// const { brainData } = require("../utils/brainLogic");
// const remedyExplanation = require("../utils/brain/remedyExplanation.json");
// const stringSimilarity = require("string-similarity");

// function extractRubricsFromCase(caseInput) {
//   if (!brainData || !Array.isArray(brainData)) {
//     console.error("❌ brainData is not loaded or not an array");
//     return [];
//   }

//   const text = Object.values(caseInput || {})
//     .join(" ")
//     .toLowerCase();

//   const words = text
//     .split(/[,.;\n]/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   const allRubrics = brainData
//     .map((entry) => entry.rubric)
//     .filter((r) => typeof r === "string" && r.trim() !== "");

//   const matches = new Set();

//   words.forEach((userPhrase) => {
//     const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
//     bestMatch.ratings.forEach((match) => {
//       if (match.rating > 0.3) {
//         matches.add(match.target);
//       }
//     });
//   });

//   return Array.from(matches);
// }

// /**
//  * Explanation function that only returns explanation
//  * if remedy symptoms overlap with user rubrics exactly.
//  * Otherwise returns null.
//  */
// // function getExplanation(remedyName, matchedRubrics) {
// //   const explanationEntry = remedyExplanation[remedyName];
// //   if (!explanationEntry) {
// //     return `No classical explanation found for ${remedyName}.`;
// //   }

// //   // Find intersection of user rubrics and remedy symptoms
// //   const relevantSymptoms = matchedRubrics.filter((rubric) =>
// //     explanationEntry.symptoms?.some(
// //       (symptom) => rubric.toLowerCase() === symptom.toLowerCase()
// //     )
// //   );

// //   if (relevantSymptoms.length === 0) {
// //     // No overlap → no explanation
// //     return null;
// //   }

// //   return `${remedyName} is selected because of symptoms: ${relevantSymptoms.join(
// //     ", "
// //   )}. ${explanationEntry.reason || ""}`;
// // }

// function generateCustomExplanation(remedyName, matchedRubrics, rubricData) {
//   // Normalize rubrics to lowercase trimmed keys for lookup
//   const relevantRubrics = matchedRubrics.filter((rubric) => {
//     const normalized = rubric.trim().toLowerCase();
//     const grading = rubricData[normalized];
//     return grading && grading[remedyName] > 0;
//   });

//   if (relevantRubrics.length === 0) {
//     return `No direct symptom match explanation available for ${remedyName}.`;
//   }

//   const explanationParts = relevantRubrics.map((rubric) => {
//     const normalized = rubric.trim().toLowerCase();
//     const grade = rubricData[normalized][remedyName];
//     let strength = "";

//     if (grade >= 3) strength = "strongly";
//     else if (grade === 2) strength = "moderately";
//     else strength = "slightly";

//     return `It ${strength} covers the symptom "${rubric}" (grade ${grade}).`;
//   });

//   return explanationParts.join(" ") + ` Therefore, ${remedyName} is selected for this case.`;
// }


// // exports.analyzeCase = (req, res) => {
// //   const { rubrics, caseInput } = req.body;
// //   console.log("✅ req.body =", req.body);
// //   console.log("✅ rubrics =", rubrics);
// //   console.log("✅ caseInput =", caseInput);

// //   let finalRubrics = rubrics || [];

// //   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
// //     finalRubrics = extractRubricsFromCase(caseInput);
// //   }

// //   console.log("📩 Incoming caseInput:", caseInput);
// //   console.log("🔍 Rubrics used:", finalRubrics);

// //   if (!finalRubrics.length) {
// //     return res
// //       .status(400)
// //       .json({ error: "No rubrics or valid caseInput found." });
// //   }

// //   if (!brainData || !Array.isArray(brainData)) {
// //     console.error("❌ brainData is not properly loaded");
// //     return res
// //       .status(500)
// //       .json({ error: "Internal error: brain data not available." });
// //   }

// //   const remedyScore = {};

// //   brainData.forEach((entry) => {
// //     if (finalRubrics.includes(entry.rubric)) {
// //       if (entry.remedies && Array.isArray(entry.remedies)) {
// //         entry.remedies.forEach(({ name, grade }) => {
// //           if (!remedyScore[name]) remedyScore[name] = 0;
// //           remedyScore[name] += grade;
// //         });
// //       }
// //     }
// //   });

// //   const sorted = Object.entries(remedyScore)
// //     .sort((a, b) => b[1] - a[1])
// //     .map(([name, score]) => ({ name, score }));

// //   console.log("🏁 Final remedies:", sorted.slice(0, 10));

// //   const mainRemedy = sorted[0]?.name || "N/A";

// //   // Get explanation ONLY if symptoms overlap
// //   const explanation = getExplanation(mainRemedy, finalRubrics);

// //   res.json({
// //     inputRubrics: finalRubrics,
// //     topRemedies: sorted.slice(0, 10),
// //     main_remedy: mainRemedy,
// //     dosage: "1M once daily",
// //     analysis: "Based on dominant mind and physical rubrics",
// //     pioneer_explanation:
// //       explanation || `Selected based on rubric match: ${finalRubrics
// //         .slice(0, 3)
// //         .join(", ")}`,
// //   });
// // };
// exports.analyzeCase = (req, res) => {
//   const { rubrics, caseInput } = req.body;
//   console.log("✅ req.body =", req.body);

//   let finalRubrics = rubrics || [];

//   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
//     finalRubrics = extractRubricsFromCase(caseInput);
//   }

//   console.log("📩 Incoming caseInput:", caseInput);
//   console.log("🔍 Rubrics used:", finalRubrics);

//   if (!finalRubrics.length) {
//     return res.status(400).json({ error: "No rubrics or valid caseInput found." });
//   }

//   if (!brainData || !Array.isArray(brainData)) {
//     console.error("❌ brainData is not properly loaded");
//     return res.status(500).json({ error: "Internal error: brain data not available." });
//   }

//   const remedyScore = {};

//   brainData.forEach((entry) => {
//     if (finalRubrics.includes(entry.rubric)) {
//       if (entry.remedies && Array.isArray(entry.remedies)) {
//         entry.remedies.forEach(({ name, grade }) => {
//           if (!remedyScore[name]) remedyScore[name] = 0;
//           remedyScore[name] += grade;
//         });
//       }
//     }
//   });

//   const sorted = Object.entries(remedyScore)
//     .sort((a, b) => b[1] - a[1])
//     .map(([name, score]) => ({ name, score }));

//   const mainRemedy = sorted[0]?.name || "N/A";

//   // Use the helper to generate explanation
//   const explanation = generateCustomExplanation(mainRemedy, finalRubrics, loadAllRubrics());

//   console.log("🏁 Final remedies:", sorted.slice(0, 10));

//   res.json({
//     inputRubrics: finalRubrics,
//     topRemedies: sorted.slice(0, 10),
//     main_remedy: mainRemedy,
//     dosage: "1M once daily",
//     analysis: "Based on dominant mind and physical rubrics",
//     pioneer_explanation: explanation,
//   });
// };


// exports.searchRubrics = (req, res) => {
//   const query = req.query.q?.toLowerCase() || "";
//   const matches = brainData
//     .map((entry) => entry.rubric)
//     .filter((rubric) => rubric.toLowerCase().includes(query));
//   res.json({ results: matches });
// };
// const { brainData } = require("../utils/brainLogic");
// const stringSimilarity = require("string-similarity");

// function extractRubricsFromCase(caseInput) {
//   if (!brainData || !Array.isArray(brainData)) {
//     console.error("❌ brainData is not loaded or not an array");
//     return [];
//   }

//   const text = Object.values(caseInput || {})
//     .join(" ")
//     .toLowerCase();

//   const words = text
//     .split(/[,.;\n]/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   const allRubrics = brainData
//     .map((entry) => entry.rubric)
//     .filter((r) => typeof r === "string" && r.trim() !== "");

//   const matches = new Set();

//   words.forEach((userPhrase) => {
//     const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
//     bestMatch.ratings.forEach((match) => {
//       if (match.rating > 0.3) {
//         matches.add(match.target);
//       }
//     });
//   });

//   return Array.from(matches);
// }


// exports.analyzeCase = (req, res) => {
//   const { rubrics, caseInput } = req.body;
//   console.log("✅ req.body =", req.body);
//   console.log("✅ rubrics =", req.body.rubrics);
//   console.log("✅ caseInput =", req.body.caseInput);

//   let finalRubrics = rubrics || [];

//   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
//     finalRubrics = extractRubricsFromCase(caseInput);
//   }

//   console.log("📩 Incoming caseInput:", caseInput);
//   console.log("🔍 Rubrics used:", finalRubrics);

//   if (!finalRubrics.length) {
//     return res
//       .status(400)
//       .json({ error: "No rubrics or valid caseInput found." });
//   }

//   if (!brainData || !Array.isArray(brainData)) {
//     console.error("❌ brainData is not properly loaded");
//     return res
//       .status(500)
//       .json({ error: "Internal error: brain data not available." });
//   }

//   const remedyScore = {};

//   brainData.forEach((entry) => {
//     if (finalRubrics.includes(entry.rubric)) {
//       if (entry.remedies && Array.isArray(entry.remedies)) {
//         entry.remedies.forEach(({ name, grade }) => {
//           if (!remedyScore[name]) remedyScore[name] = 0;
//           remedyScore[name] += grade;
//         });
//       }
//     }
//   });

//   const sorted = Object.entries(remedyScore)
//     .sort((a, b) => b[1] - a[1])
//     .map(([name, score]) => ({ name, score }));

//   console.log("🏁 Final remedies:", sorted.slice(0, 10));

//   res.json({
//     inputRubrics: finalRubrics,
//     topRemedies: sorted.slice(0, 10),
//     main_remedy: sorted[0]?.name || "N/A",
//     dosage: "1M once daily",
//     analysis: "Based on dominant mind and physical rubrics",
//     pioneer_explanation: `Selected based on rubric match: ${finalRubrics
//       .slice(0, 3)
//       .join(", ")}`,
//   });
// };
// exports.searchRubrics = (req, res) => {
//   const query = req.query.q?.toLowerCase() || "";
//   const matches = brainData
//     .map((entry) => entry.rubric)
//     .filter((rubric) => rubric.toLowerCase().includes(query));
//   res.json({ results: matches });
// };

// function generateExplanation(remedyName, finalRubrics) {
//   const matchedRubrics = [];

//   brainData.forEach((entry) => {
//     if (
//       entry.rubric &&
//       finalRubrics.includes(entry.rubric) &&
//       entry.remedies?.some((r) => r.name === remedyName)
//     ) {
//       matchedRubrics.push(entry.rubric);
//     }
//   });

//   if (matchedRubrics.length === 0) {
//     return `Selected remedy is ${remedyName}, but no specific rubric from your input matched.`;
//   }

//   return `${remedyName} was selected based on your input symptoms: ${matchedRubrics
//     .slice(0, 5)
//     .join(", ")}.`;
// }

// exports.analyzeCase = (req, res) => {
//   const { rubrics, caseInput } = req.body;
//   console.log("✅ req.body =", req.body);

//   let finalRubrics = rubrics || [];

//   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
//     finalRubrics = extractRubricsFromCase(caseInput);
//   }

//   if (!finalRubrics.length) {
//     return res
//       .status(400)
//       .json({ error: "No rubrics or valid caseInput found." });
//   }

//   if (!brainData || !Array.isArray(brainData)) {
//     console.error("❌ brainData is not properly loaded");
//     return res
//       .status(500)
//       .json({ error: "Internal error: brain data not available." });
//   }

//   const remedyScore = {};

//   brainData.forEach((entry) => {
//     if (finalRubrics.includes(entry.rubric)) {
//       entry.remedies?.forEach(({ name, grade }) => {
//         if (!remedyScore[name]) remedyScore[name] = 0;
//         remedyScore[name] += grade;
//       });
//     }
//   });

//   const sorted = Object.entries(remedyScore)
//     .sort((a, b) => b[1] - a[1])
//     .map(([name, score]) => ({ name, score }));

//   const mainRemedy = sorted[0]?.name || "N/A";
//   const explanation = generateExplanation(mainRemedy, finalRubrics);

//   res.json({
//     inputRubrics: finalRubrics,
//     topRemedies: sorted.slice(0, 10),
//     main_remedy: mainRemedy,
//     dosage: "1M once daily",
//     analysis: "Based on your matched rubrics",
//     pioneer_explanation: explanation,
//  });
// };

const { brainData } = require("../utils/brainLogic");
const stringSimilarity = require("string-similarity");

function extractRubricsFromCase(caseInput) {
  if (!brainData || !Array.isArray(brainData)) {
    console.error("❌ brainData is not loaded or not an array");
    return [];
  }

  const text = Object.values(caseInput || {})
    .join(" ")
    .toLowerCase();

  const words = text
    .split(/[,.;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const allRubrics = brainData
    .map((entry) => entry.rubric)
    .filter((r) => typeof r === "string" && r.trim() !== "");

  const matches = new Set();

  words.forEach((userPhrase) => {
    const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
    bestMatch.ratings.forEach((match) => {
      if (match.rating > 0.3) {
        matches.add(match.target);
      }
    });
  });

  return Array.from(matches);
}

function generateStructuredExplanation(remedyName, allRubricsUsed) {
  const matchedRubrics = [];

  let miasm = "Not classified";

  brainData.forEach((entry) => {
    if (
      entry.rubric &&
      allRubricsUsed.includes(entry.rubric) &&
      entry.remedies?.some((r) => r.name === remedyName)
    ) {
      matchedRubrics.push(entry.rubric);
      if (entry.miasm) {
        miasm = entry.miasm;
      }
    }
  });

  const reason = `${remedyName} was selected based on the following matched symptoms: ${matchedRubrics.join(", ")}`;
  return {
    name: remedyName,
    miasm,
    reason,
    key_symptoms: matchedRubrics,
  };
}

exports.analyzeCase = (req, res) => {
  const { rubrics, caseInput } = req.body;

  let finalRubrics = rubrics || [];

  if ((!finalRubrics || !finalRubrics.length) && caseInput) {
    finalRubrics = extractRubricsFromCase(caseInput);
  }

  if (!finalRubrics.length) {
    return res.status(400).json({ error: "No rubrics or valid caseInput found." });
  }

  if (!brainData || !Array.isArray(brainData)) {
    console.error("❌ brainData is not properly loaded");
    return res.status(500).json({ error: "Internal error: brain data not available." });
  }

  const remedyScore = {};

  brainData.forEach((entry) => {
    if (finalRubrics.includes(entry.rubric)) {
      entry.remedies?.forEach(({ name, grade }) => {
        if (!remedyScore[name]) remedyScore[name] = 0;
        remedyScore[name] += grade;
      });
    }
  });

  const sorted = Object.entries(remedyScore)
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => ({ name, score }));

  const mainRemedy = sorted[0]?.name || "N/A";
  const mainExplanation = generateStructuredExplanation(mainRemedy, finalRubrics);

  const nextBest = sorted.slice(1, 3).map((remedyObj) =>
    generateStructuredExplanation(remedyObj.name, finalRubrics)
  );

  res.json({
    inputRubrics: finalRubrics,
    main_remedy: mainExplanation,
    next_best_remedies: nextBest,
    dosage: "1M once daily",
    analysis: "Based on rubric-to-remedy match scoring",
  });
};

exports.searchRubrics = (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const matches = brainData
    .map((entry) => entry.rubric)
    .filter((rubric) => rubric.toLowerCase().includes(query));
  res.json({ results: matches });
};
