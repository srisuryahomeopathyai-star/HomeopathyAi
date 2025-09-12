/** @format */

// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const router = express.Router();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash-lite-preview-06-17" });

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${ext}`);
//   },
// });
// const upload = multer({ storage });

// function fileToBase64(filePath) {
//   const file = fs.readFileSync(filePath);
//   return file.toString("base64");
// }

// router.post("/analyze-skin", upload.single("image"), async (req, res) => {
//   try {
//     const imagePath = req.file.path;
//     const base64Image = fileToBase64(imagePath);

//     const result = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               inlineData: {
//                 mimeType: "image/jpeg",
//                 data: base64Image,
//               },
//             },
//             {
//               text: `
// You are a dermatology AI expert.

// Analyze the uploaded skin image and match it to the **most likely skin condition** from the following list of 30 common skin diseases:

// [Psoriasis, Eczema, Tinea corporis, Pityriasis rosea, Lichen planus, Seborrheic dermatitis, Contact dermatitis, Urticaria, Vitiligo, Scabies, Boils, Impetigo, Acne vulgaris, Rosacea, Herpes simplex, Herpes zoster, Warts, Molluscum contagiosum, Melasma, Hyperpigmentation, Lichen simplex chronicus, Dermatophytosis, Folliculitis, Alopecia areata, Xerosis, Intertrigo, Ringworm, Atopic dermatitis, Pityriasis versicolor, Ichthyosis vulgaris]

// ✅ Output should be in JSON format only.

// Example format:
// {
//   "diagnosis": "Psoriasis",
//   "explanation": "Thick red patches with silvery scales on extensor surfaces. Chronic and itchy."
// }

// ❌ Do not guess any condition outside this list. If unsure, respond:
// {
//   "diagnosis": "Uncertain",
//   "explanation": "The skin image is unclear or does not match any of the listed diseases."
// }
// `,
//             },
//           ],
//         },
//       ],
//     });

//     const response = await result.response.text();

//     let parsed;
//     try {
//       const jsonStart = response.indexOf("{");
//       const jsonEnd = response.lastIndexOf("}") + 1;
//       const jsonString = response.slice(jsonStart, jsonEnd);
//       parsed = JSON.parse(jsonString);
//     } catch (e) {
//       parsed = {
//         diagnosis: "Uncertain",
//         explanation:
//           "Unable to parse AI response. Check image clarity or re-upload.",
//       };
//     }

//     res.json(parsed);
//   } catch (err) {
//     console.error("Image Diagnosis Error:", err);
//     res.status(500).json({ error: "Failed to analyze image" });
//   }
// });

// module.exports = router;

// /** @format */

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

require("dotenv").config();
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

function fileToBase64(filePath) {
  const file = fs.readFileSync(filePath);
  return file.toString("base64");
}

router.post("/analyze-skin", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const base64Image = fileToBase64(imagePath);

    const prompt = `
You are a dermatology AI expert.

Analyze the uploaded skin image and match it to the **most likely skin condition** from the following list of 30 common skin diseases:

[Psoriasis, Eczema, Tinea corporis, Pityriasis rosea, Lichen planus, Seborrheic dermatitis, Contact dermatitis, Urticaria, Vitiligo, Scabies, Boils, Impetigo, Acne vulgaris, Rosacea, Herpes simplex, Herpes zoster, Warts, Molluscum contagiosum, Melasma, Hyperpigmentation, Lichen simplex chronicus, Dermatophytosis, Folliculitis, Alopecia areata, Xerosis, Intertrigo, Ringworm, Atopic dermatitis, Pityriasis versicolor, Ichthyosis vulgaris]

✅ Output should be in JSON format only.

Example format:
{
  "diagnosis": "Psoriasis",
  "explanation": "Thick red patches with silvery scales on extensor surfaces. Chronic and itchy."
}

❌ Do not guess any condition outside this list. If unsure, respond:
{
  "diagnosis": "Uncertain",
  "explanation": "The skin image is unclear or does not match any of the listed diseases."
}
`;

    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    const responseText = result.choices[0].message.content;

    let parsed;
    try {
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      const jsonString = responseText.slice(jsonStart, jsonEnd);
      parsed = JSON.parse(jsonString);
    } catch (e) {
      parsed = {
        diagnosis: "Uncertain",
        explanation:
          "Unable to parse AI response. Check image clarity or re-upload.",
      };
    }

    res.json(parsed);

    // Optionally delete uploaded file
    fs.unlinkSync(imagePath);
  } catch (err) {
    console.error("OpenAI Image Diagnosis Error:", err);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

module.exports = router;
