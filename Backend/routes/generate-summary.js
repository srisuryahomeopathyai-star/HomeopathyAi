/** @format */

// const express = require("express");
// const router = express.Router();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const API_KEY = process.env.GEMINI_API_KEY; // Set this in .env file or replace with actual key
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash-lite-preview-06-17" });

// function buildPromptFromCaseData(caseData) {
//   const complaints = (caseData.chiefComplaints || [])
//     .map((c, i) => `${i + 1}. ${c.complaint} - ${c.description} (${c.duration}, Modalities: ${c.modalities})`)
//     .join("\n");

//   return `
// You are a classical homeopathy expert.

// Please analyze this patient case and return:
// 1. Key summary of findings
// 2. Miasmatic diagnosis
// 3. Best homeopathic remedy (with explanation and dosage)

// Patient Details:
// - Name: ${caseData.name}
// - Age: ${caseData.age}
// - Gender: ${caseData.gender}
// - Marital Status: ${caseData.maritalStatus}
// - Occupation: ${caseData.occupation}
// - Thermal Reaction: ${caseData.personalHistory?.thermal || "N/A"}
// - Cravings / Aversions: ${caseData.personalHistory?.cravingsAversions || "N/A"}

// Chief Complaints:
// ${complaints || "No complaints specified"}

// History of Present Illness:
// ${caseData.historyPresentIllness || "N/A"}

// Past History:
// - Childhood Diseases: ${caseData.pastHistory?.childhoodDiseases || "N/A"}
// - Surgeries / Injuries: ${caseData.pastHistory?.surgeriesInjuries || "N/A"}
// - Major Illnesses: ${caseData.pastHistory?.majorIllnesses || "N/A"}

// Family History:
// ${caseData.familyHistory || "N/A"}

// Personal History:
// - Appetite: ${caseData.personalHistory?.appetite || "N/A"}
// - Thirst: ${caseData.personalHistory?.thirst || "N/A"}
// - Bowel: ${caseData.personalHistory?.bowel || "N/A"}
// - Urine: ${caseData.personalHistory?.urine || "N/A"}
// - Sleep: ${caseData.personalHistory?.sleep || "N/A"}
// - Dreams: ${caseData.personalHistory?.dreams || "N/A"}
// - Sweat: ${caseData.personalHistory?.sweat || "N/A"}
// - Habits: ${caseData.personalHistory?.habits || "N/A"}
// - Menstrual History: ${caseData.personalHistory?.menstrual || "N/A"}

// Mental Symptoms:
// ${caseData.mentalSymptoms || "N/A"}

// General Remarks:
// ${caseData.generalRemarks || "N/A"}

// Doctor's Observations:
// ${caseData.observationsByDoctor || "N/A"}
//   `;
// }

// router.post("/", async (req, res) => {
//   try {
//     const caseData = req.body;

//     const prompt = buildPromptFromCaseData(caseData);

//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = await response.text();

//     res.json({ summary: text });
//   } catch (error) {
//     console.error("Gemini API error:", error);
//     res.status(500).json({ error: "Failed to generate summary from Gemini AI" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash-lite-preview-06-17",
  "models/gemini-1.5-flash": true,
  // model: "models/gemini-2.5-pro",
});

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

Please analyze this patient case and return:
1. Key summary of findings
2. Miasmatic diagnosis
3. Best homeopathic remedy (with explanation and dosage)
4. 2 alternative remedies (with brief reasons)
⚠️ Respond strictly in the following JSON format:
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
- Name: ${caseData.name}
- Age: ${caseData.age}
- Gender: ${caseData.gender}
- Marital Status: ${caseData.maritalStatus}
- Occupation: ${caseData.occupation}
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

router.post("/", async (req, res) => {
  try {
    const caseData = req.body;
    const prompt = buildPromptFromCaseData(caseData);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();

    let parsed;
    try {
       parsed = JSON.parse(text);
    } catch {
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}") + 1;
      if (jsonStart === -1 || jsonEnd === -1) {
        return res
          .status(500)
          .json({ error: "Invalid structured response from Gemini" });
      }
      const jsonString = text.slice(jsonStart, jsonEnd);
      parsed = JSON.parse(jsonString);
    }

    res.json({
      summary: parsed.summary,
      geminiRemedy: parsed.remedy,
      miasm: parsed.miasm,
      dosage: parsed.dosage,
      key_symptoms: parsed.key_symptoms || [],
      next_best_remedies: parsed.next_best_remedies || [],
    });
    console.log(
      `Remedy: ${parsed.remedy}, Miasm: ${parsed.miasm}, Dosage: ${parsed.dosage}, Summary: ${parsed.summary}`
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    res
      .status(500)
      .json({ error: "Failed to generate summary from Gemini AI" });
  }
});

module.exports = router;
// const express = require("express");
// require("dotenv").config();
// const fs = require("fs");
// const router = express.Router();
// const { OpenAI } = require("openai");

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// const generateHomeoSummary = async (caseData) => {
//   try {
//     const prompt = `
// You are a homeopathy expert.

// If a patient's face image is provided, analyze it visually to identify possible health indicators. Then, read the detailed case information below and recommend:
// - Likely diagnosis
// - Homeopathy remedy (name, potency, dosage, frequency)
// - Alternate remedies (if any)
// - Suggestions in plain, actionable language

// Avoid symbols or complex formatting. Use natural explanation style.

// Patient Details:
// Name: ${caseData.name}
// Age: ${caseData.age}
// Gender: ${caseData.gender}
// Marital Status: ${caseData.maritalStatus}
// Occupation: ${caseData.occupation}
// Address: ${caseData.address}
// Phone: ${caseData.phone}
// Date of Visit: ${caseData.dateOfVisit}

// Chief Complaints:
// ${
//   Array.isArray(caseData.chiefComplaints)
//     ? caseData.chiefComplaints
//         .map(
//           (c, i) =>
//             `${i + 1}. Complaint: ${c.complaint}, Duration: ${
//               c.duration
//             }, Description: ${c.description}`
//         )
//         .join("\n")
//     : ""
// }

// History of Present Illness: ${caseData.historyPresentIllness}

// Past History:
//   Childhood: ${caseData.pastHistory?.childhoodDiseases}
//   Surgeries/Injuries: ${caseData.pastHistory?.surgeriesInjuries}
//   Major Illnesses: ${caseData.pastHistory?.majorIllnesses}

// Family History: ${caseData.familyHistory}

// Personal History:
//   Appetite: ${caseData.personalHistory?.appetite}
//   Cravings/Aversions: ${caseData.personalHistory?.cravingsAversions}
//   Thirst: ${caseData.personalHistory?.thirst}
//   Bowel: ${caseData.personalHistory?.bowel}
//   Urine: ${caseData.personalHistory?.urine}
//   Sleep: ${caseData.personalHistory?.sleep}
//   Dreams: ${caseData.personalHistory?.dreams}
//   Sweat: ${caseData.personalHistory?.sweat}
//   Thermal: ${caseData.personalHistory?.thermal}
//   Habits: ${caseData.personalHistory?.habits}
//   Menstrual: ${caseData.personalHistory?.menstrual}

// Mental Symptoms: ${caseData.mentalSymptoms}
// General Remarks: ${caseData.generalRemarks}
// Doctor Observations: ${caseData.observationsByDoctor}

// Prescription:
// ${
//   Array.isArray(caseData.prescription)
//     ? caseData.prescription
//         .map(
//           (p, i) =>
//             `${i + 1}. Date: ${p.date}, Remedy: ${p.remedyName}, Potency: ${
//               p.potency
//             }, Dose: ${p.dose}, Instructions: ${p.instructions}`
//         )
//         .join("\n")
//     : ""
// }
//     `;

//     const messages = [
//       {
//         role: "user",
//         content: [],
//       },
//     ];

//     // Add text part to the prompt
//     messages[0].content.push({
//       type: "text",
//       text: prompt,
//     });

//     // Add image if provided
//     if (caseData.imageBase64) {
//       messages[0].content.unshift({
//         type: "image_url",
//         image_url: {
//           url: `data:image/jpeg;base64,${caseData.imageBase64}`,
//         },
//       });
//     }

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: messages,
//     });

//     const text = response.choices[0].message.content;
//     return text;
//   } catch (error) {
//     console.error("OpenAI GPT-4o error:", error);
//     throw new Error("Failed to generate homeopathy summary");
//   }
// };

// router.post("/", async (req, res) => {
//   try {
//     console.log("📥 Received summary request");
//     const caseData = req.body;
//     const summary = await generateHomeoSummary(caseData);
//     res.json({ summary });
//   } catch (error) {
//     console.error("❌ Summary generation failed:", error);
//     res.status(500).json({ error: "Failed to generate summary" });
//   }
// });

// module.exports = router;
