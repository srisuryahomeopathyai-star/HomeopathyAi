/** @format */

const {
  fullCaseAnalysis,
  getRemediesFromRubrics,
} = require("../utils/brainLogic");
const { loadAllRubrics } = require("../utils/loadBrainFile");
const stringSimilarity = require("string-similarity");
const remedyExplanation = require("../utils/brain/remedyExplanation.json");

function extractRubricsFromCase(caseInput) {
  const text = Object.values(caseInput || {})
    .join(" ")
    .toLowerCase();
  const phrases = text
    .split(/[,.;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const allRubrics = Object.keys(loadAllRubrics());
  const matches = new Set();

  phrases.forEach((phrase) => {
    const bestMatch = stringSimilarity.findBestMatch(phrase, allRubrics);
    bestMatch.ratings.forEach((match) => {
      if (match.rating > 0.3) {
        matches.add(match.target);
      }
    });
  });

  return Array.from(matches);
}

exports.analyzeCase = (req, res) => {
  try {
    const {
      rubrics,
      caseInput,
      geminiRemedy,
      geminiMiasm,
      geminiReason,
      geminiDosage,
      geminiKeySymptoms,
      geminiNextBestRemedies,
    } = req.body;

    let finalRubrics = rubrics || [];

    // Try to extract from free text if rubrics are empty
    if ((!finalRubrics || !finalRubrics.length) && caseInput) {
      finalRubrics = extractRubricsFromCase(caseInput);
    }

    console.log("🔍 Final rubrics:", finalRubrics);

    if (!finalRubrics || !finalRubrics.length) {
      return res.json({
        inputRubrics: [],
        main_remedy: {
          name: geminiRemedy || "No remedy selected",
          miasm: geminiMiasm || "N/A",
          reason: geminiReason || "No explanation provided",
          dosage: geminiDosage || "N/A",
          key_symptoms: geminiKeySymptoms || [],
        },
        next_best_remedies: geminiNextBestRemedies || [],
      });
    }

    // Correct: This returns an array of { name, grade }
    const remedyGrades = getRemediesFromRubrics(finalRubrics);

    // Run rubric-based analysis
    const sorted = fullCaseAnalysis({ remedyGrades });

    const top3 = sorted.slice(0, 3);

    const getInfo = (remedyName, isMain = false) => {
      const match = remedyExplanation.find(
        (entry) => entry.remedy.toLowerCase() === remedyName?.toLowerCase()
      );
      if (!match) return null;

      return {
        name: remedyName,
        miasm: match.miasm || "N/A",
        reason: match.pioneerRemarks?.[0] || "No reason found.",
        key_symptoms: match.keynotes || [],
        confirmatory_rubrics: match.confirmatoryRubrics || [],
        modalities: match.modalities || {},
        mental_symptoms: match.mentalSymptoms || [],
        physical_generals: match.physicalGenerals || [],
        dosage: isMain ? "1M once daily for 3 days" : "200C once at night",
      };
    };

    const mainInfo = getInfo(top3[0]?.name, true);
    const nextInfos = top3
      .slice(1)
      .map((r) => getInfo(r.name))
      .filter(Boolean);

    res.json({
      inputRubrics: finalRubrics,
      main_remedy: mainInfo || { name: "N/A" },
      next_best_remedies: nextInfos,
    });
  } catch (error) {
    console.error("❌ analyzeCase error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.searchRubrics = (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const allRubrics = Object.keys(loadAllRubrics());

  const results = allRubrics
    .filter((rubric) => rubric.toLowerCase().includes(query))
    .map((rubric) => ({
      target: rubric,
      rating: 1,
    }));

  res.json({ results });
};
