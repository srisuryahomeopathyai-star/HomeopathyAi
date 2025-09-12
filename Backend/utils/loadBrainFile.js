/** @format */

// /** @format */
// const fs = require("fs");
// const path = require("path");

// function normalize(text) {
//   if (typeof text !== "string") return "";
//   return text.trim().toLowerCase();
// }

// function loadAllRubrics() {
//   const folder = path.join(__dirname, "brain");
//   const files = fs.readdirSync(folder);
//   const allRubrics = {};
//   const emptyFiles = [];
//   let rubricCount = 0;

//   files.forEach((file) => {
//     if (file.endsWith(".json") && file !== "miasmMap.json") {
//       const filePath = path.join(folder, file);
//       const raw = fs.readFileSync(filePath, "utf-8");

//       let data;
//       try {
//         data = JSON.parse(raw);
//       } catch (err) {
//         console.error(`❌ JSON parse error in ${file}:`, err.message);
//         emptyFiles.push(file);
//         return;
//       }

//       let addedRubrics = 0;

//       // Helper function
//       const addRubric = (rubricObj) => {
//         if (rubricObj.rubric && rubricObj.grading) {
//           const normalized = normalize(rubricObj.rubric);
//           const remedyMap = {};
//           (rubricObj.grading.high || []).forEach((r) => (remedyMap[r] = 3));
//           (rubricObj.grading.medium || []).forEach((r) => (remedyMap[r] = 2));
//           (rubricObj.grading.low || []).forEach((r) => (remedyMap[r] = 1));
//           allRubrics[normalized] = {
//             grading: remedyMap,
//             modality: rubricObj.modality || "",
//             miasm: rubricObj.miasm || "",
//             notes: rubricObj.notes || "",
//           };
//           rubricCount++;
//           addedRubrics++;
//         }
//       };

//       if (Array.isArray(data)) {
//         data.forEach((entry) => {
//           if (entry?.rubrics && Array.isArray(entry.rubrics)) {
//             // Case: [{ disease: "", rubrics: [...] }]
//             entry.rubrics.forEach(addRubric);
//           } else if (entry?.rubric && entry?.grading) {
//             // Case: [{ rubric: "", grading: {...} }]
//             addRubric(entry);
//           } else if (typeof entry === "object") {
//             // Case: [{ "rubric key": { grading: {...} } }]
//             Object.entries(entry).forEach(([key, val]) => {
//               addRubric({ rubric: key, ...val });
//             });
//           }
//         });
//       } else if (typeof data === "object") {
//         Object.entries(data).forEach(([key, val]) => {
//           addRubric({ rubric: key, ...val });
//         });
//       }

//       if (addedRubrics === 0) {
//         emptyFiles.push(file);
//       }
//     }
//   });

//   console.log("✅ Total rubrics loaded:", rubricCount);
//   if (emptyFiles.length > 0) {
//     console.log("⚠️ Files with no valid rubrics:", emptyFiles);
//   }

//   const remedyFrequency = {};
//   Object.values(allRubrics).forEach((entry) => {
//     Object.keys(entry.grading).forEach((remedy) => {
//       remedyFrequency[remedy] = (remedyFrequency[remedy] || 0) + 1;
//     });
//   });

//   return {
//     rubricData: allRubrics,
//     remedyFrequency,
//   };
// }

// module.exports = {
//   loadAllRubrics,
//   normalize,
// };
const fs = require("fs");
const path = require("path");

function ensureArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val
      .split(/[,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function normalize(text) {
  if (typeof text !== "string") return "";
  return text.trim().toLowerCase();
}

function loadAllRubrics() {
  const folder = path.join(__dirname, "brain");
  const files = fs.readdirSync(folder);
  const allRubrics = {};
  let rubricCount = 0;

  files.forEach((file) => {
    if (file.endsWith(".json") && file !== "miasmMap.json") {
      const filePath = path.join(folder, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      let data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        console.error(`❌ JSON parse error in ${file}:`, err.message);
        return;
      }

      // Helper function
      const addRubric = (rubricName, rubricObj) => {
        if (!rubricObj) return;

        const normalized = rubricName ? normalize(String(rubricName)) : "";
        if (!normalized) return;

        const remedyMap = {};
        ensureArray(rubricObj.high).forEach((r) => (remedyMap[r] = 3));
        ensureArray(rubricObj.medium).forEach((r) => (remedyMap[r] = 2));
        ensureArray(rubricObj.low).forEach((r) => (remedyMap[r] = 1));

        allRubrics[normalized] = {
          grading: remedyMap,
          modality: rubricObj.modality || "",
          miasm: rubricObj.miasm || "",
          notes: rubricObj.notes || "",
        };
        rubricCount++;
      };

      if (Array.isArray(data)) {
        data.forEach((entry) => {
          if (typeof entry === "object") {
            Object.entries(entry).forEach(([rubricName, rubricObj]) => {
              addRubric(rubricName, rubricObj);
            });
          }
        });
      } else if (typeof data === "object") {
        Object.entries(data).forEach(([rubricName, rubricObj]) => {
          addRubric(rubricName, rubricObj);
        });
      }
    }
  });

  console.log("✅ Total rubrics loaded:", rubricCount);

  const remedyFrequency = {};
  Object.values(allRubrics).forEach((entry) => {
    Object.keys(entry.grading).forEach((remedy) => {
      remedyFrequency[remedy] = (remedyFrequency[remedy] || 0) + 1;
    });
  });

  return {
    rubricData: allRubrics,
    remedyFrequency,
  };
}

module.exports = {
  loadAllRubrics,
  normalize,
};
