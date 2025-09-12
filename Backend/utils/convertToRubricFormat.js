/** @format */

const fs = require("fs");
const path = require("path");

function convertSleepRubricFile(inputPath, outputPath) {
  const raw = fs.readFileSync(inputPath, "utf-8");
  let data;

  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Error parsing ${inputPath}: ${err.message}`);
    return;
  }

  const result = [];
  const normalize = (s) => (typeof s === "string" ? s.trim() : "");

  const array = Array.isArray(data) ? data : [data];

  array.forEach((entry) => {
    const rubric = normalize(entry.rubric);
    const miasm = normalize(entry.miasm || "");
    ["high", "medium", "low"].forEach((grade) => {
      const key = `${grade}GradeDrugs`;
      const remedies = Array.isArray(entry[key]) ? entry[key] : [];
      remedies.forEach((remedy) => {
        result.push({
          rubric,
          miasm,
          remedy: normalize(remedy),
          grade,
        });
      });
    });
  });

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(
    `✅ Converted ${path.basename(inputPath)} → ${path.basename(outputPath)} [${
      result.length
    } rows]`
  );
}

// 🧪 Example usage:
const input = path.join(__dirname, "brain", "sleep.json");
const output = path.join(__dirname, "brain", "sleep_rubrics.json");
convertSleepRubricFile(input, output);
