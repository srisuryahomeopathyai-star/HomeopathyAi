const express = require("express");
const multer = require("multer");
const fs = require("fs");
const sendImageToPython = require("../callPython");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/skin-diagnosis", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📥 Image received:", req.file.path);
    const result = await sendImageToPython(req.file.path);
    console.log("🧠 Diagnosis Result:", result);

    fs.unlink(req.file.path, () => {});
    res.json({ diagnosis: result });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
