const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Homeopathy mapping
const remedyMap = {
  Acne: ["Hepar sulph", "Kali brom", "Silicea"],
  Eczema: ["Graphites", "Sulphur", "Rhus tox"],
  Psoriasis: ["Arsenicum album", "Petroleum", "Kali ars"],
  Ringworm: ["Sepia", "Tellurium", "Thuja"],
  Boils: ["Belladonna", "Hepar sulph", "Silicea"],
  Urticaria: ["Apis", "Nat mur", "Urtica urens"],
  Warts: ["Thuja", "Causticum", "Ant crud"]
};

app.post("/analyze-skin", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });

  try {
    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: "image.jpg",
      contentType: "image/jpeg"
    });

    const response = await axios.post("http://localhost:5001/predict", formData, {
      headers: formData.getHeaders()
    });

    const diagnosis = response.data.diagnosis;
    const remedies = remedyMap[diagnosis] || [];

    res.json({ diagnosis, remedies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Skin analysis failed" });
  }
});

app.listen(5000, () => {
  console.log("Node.js backend running on http://localhost:5000");
});
