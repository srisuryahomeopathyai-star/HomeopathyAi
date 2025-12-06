const Case = require("../models/Case");
exports.createCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getCaseById = async (req, res) => {
  try {
    const singleCase = await Case.findById(req.params.id);
    if (!singleCase) return res.status(404).json({ error: "Not found" });
    res.json(singleCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateCase = async (req, res) => {
  console.log('updateCase function called'); // Add this line
  try {
    console.log("Received update request body:", req.body);
    console.log("Received prescriptions:", req.body.prescription);
    const caseId = req.params.id; 

    if (req.body.prescription && Array.isArray(req.body.prescription)) {
      req.body.prescription = req.body.prescription.map(p => ({
        ...p,
        date: p.date ? new Date(p.date) : new Date() // Ensure date is a Date object, default to now if not provided
      }));
    }

    const updatedCase = await Case.findByIdAndUpdate(caseId, { $set: req.body }, { new: true });

    console.log('Updated case from DB:', updatedCase);
    console.log('Updated prescriptions from DB:', updatedCase.prescription);

    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found" }); // Fixed: Complete 404 handling
    }
    res.status(200).json(updatedCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
