
/** @format */

const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const middleware = require("../middleware/middleware");
const User = require("../models/User");

// Function to build the AI prompt from case data
function buildPromptFromCaseData(caseData) {
  const complaints = (caseData.chiefComplaints || [])
    .map(
      (c, i) =>
        `${i + 1}. ${c.complaint} - ${c.description} (${
          c.duration
        }, Modalities: ${c.modalities})`
    )
    .join("\n");

  return `
You are a classical homeopathy expert.

Please analyze this patient case and return strictly in the following JSON format:
{
  "summary": "Summary of findings, miasmatic diagnosis, and remedy explanation with dosage",
  "miasm": "Miasmatic diagnosis",
  "remedy": "Best homeopathic remedy name",
  "dosage": "Suggested dosage with frequency and potency",
  "key_symptoms": ["symptom1", "symptom2"],
  "next_best_remedies": [
    { "name": "RemedyName1", "reason": "Why this was suggested" },
    { "name": "RemedyName2", "reason": "Why this was suggested" },
    { "name": "RemedyName3", "reason": "Why this was suggested" },
    { "name": "RemedyName4", "reason": "Why this was suggested" }
  ]
}

Patient Details:
- Name: ${caseData.name || "N/A"}
- Age: ${caseData.age || "N/A"}
- Gender: ${caseData.gender || "N/A"}
- Marital Status: ${caseData.maritalStatus || "N/A"}
- Occupation: ${caseData.occupation || "N/A"}
- Thermal Reaction: ${caseData.personalHistory?.thermal || "N/A"}
- Cravings / Aversions: ${caseData.personalHistory?.cravingsAversions || "N/A"}

Chief Complaints:
${complaints || "No complaints specified"}

History of Present Illness:
${caseData.historyPresentIllness || "N/A"}

Past History:
- Childhood Diseases: ${caseData.pastHistory?.childhoodDiseases || "N/A"}
- Surgeries / Injuries: ${caseData.pastHistory?.surgeriesInjuries || "N/A"}
- Major Illnesses: ${caseData.pastHistory?.majorIllnesses || "N/A"}

Family History:
${caseData.familyHistory || "N/A"}

Personal History:
- Appetite: ${caseData.personalHistory?.appetite || "N/A"}
- Thirst: ${caseData.personalHistory?.thirst || "N/A"}
- Bowel: ${caseData.personalHistory?.bowel || "N/A"}
- Urine: ${caseData.personalHistory?.urine || "N/A"}
- Sleep: ${caseData.personalHistory?.sleep || "N/A"}
- Dreams: ${caseData.personalHistory?.dreams || "N/A"}
- Sweat: ${caseData.personalHistory?.sweat || "N/A"}
- Habits: ${caseData.personalHistory?.habits || "N/A"}
- Menstrual History: ${caseData.personalHistory?.menstrual || "N/A"}

Mental Symptoms:
${caseData.mentalSymptoms || "N/A"}

General Remarks:
${caseData.generalRemarks || "N/A"}

Doctor's Observations:
${caseData.observationsByDoctor || "N/A"}
`;
}

// Main route using user-specific Gemini API key
router.post("/", middleware, async (req, res) => {
  try {
    const caseData = req.body;

    // Fetch user's Gemini API key
    const user = await User.findById(req.user.id).select("geminiApiKey");
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!user.geminiApiKey)
      return res
        .status(400)
        .json({ error: "User must provide a valid Gemini API key" });

    const genAI = new GoogleGenerativeAI(user.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = buildPromptFromCaseData(caseData);

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Attempt to parse JSON from AI response
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      if (jsonStart === -1 || jsonEnd === -1)
        return res
          .status(500)
          .json({ error: "Invalid structured response from Gemini AI" });

      parsed = JSON.parse(responseText.slice(jsonStart, jsonEnd));
    }

    // Send parsed data
    res.json({
      summary: parsed.summary,
      geminiRemedy: parsed.remedy,
      miasm: parsed.miasm,
      dosage: parsed.dosage,
      key_symptoms: parsed.key_symptoms || [],
      next_best_remedies: parsed.next_best_remedies || [],
    });

    console.log(
      `Remedy: ${parsed.remedy}, Miasm: ${parsed.miasm}, Dosage: ${parsed.dosage}`
    );
  } catch (error) {
    console.error("Gemini API error:", error);

    const status = error?.status || error?.response?.status;
    if (status === 429) {
      let retryAfterSeconds = 30;
      try {
        const retryInfo = (error.errorDetails || []).find(
          (d) => d["@type"] && d["@type"].includes("RetryInfo")
        );
        if (retryInfo?.retryDelay) {
          const m = retryInfo.retryDelay.match(/(\d+)s/);
          if (m) retryAfterSeconds = parseInt(m[1], 10);
        }
      } catch {}
      return res.status(429).json({
        error: "Rate limited by AI provider",
        retryAfterSeconds,
      });
    }

    if (status === 404) {
      return res.status(404).json({ status: 404, statusText: "Not Found" });
    }

    if (status === 403) {
      return res.status(403).json({
        error: "AI permission denied: verify user API key and project access",
      });
    }

    return res.status(500).json({
      error: "Failed to generate summary from Gemini AI",
      details: error?.message || "Unknown error",
    });
  }
});

module.exports = router;
