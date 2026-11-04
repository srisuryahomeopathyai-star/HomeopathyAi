// /** @format */

// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const FollowUp = require("../models/FollowUp");
// const { reanalyzeCase } = require("../services/analysisService");
// // Get today's follow-ups
// router.get("/today", async (req, res) => {
//   const today = new Date().toISOString().slice(0, 10);
//   try {
//     const followUps = await FollowUp.find({ date: today });
//     res.json(followUps);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all follow-ups
// router.get("/", async (req, res) => {
//   try {
//     const followUps = await FollowUp.find();
//     res.json(followUps);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add a new follow-up
// router.post("/", async (req, res) => {
//   try {
//     const followUp = new FollowUp(req.body);
//     await followUp.save();

//     if (req.body.reliefStatus === "No Relief") {
//       const analysis = await reanalyzeCase(followUp.casesId);
//       followUp.analysis = analysis;
//       await followUp.save();
//     }

//     res.status(201).json(followUp);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const followUp = await FollowUp.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     if (req.body.reliefStatus === "No Relief" && followUp) {
//       const analysis = await reanalyzeCase(followUp.casesId);
//       followUp.analysis = analysis;
//       await followUp.save();
//     }

//     res.json(followUp);
//   } catch (err) {
//     res.status(500).json({ error: "Update failed" });
//   }
// });

// // Delete follow-up by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     await FollowUp.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Delete failed" });
//   }
// });

// module.exports = router;


/** @format */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const FollowUp = require("../models/FollowUp");
const { reanalyzeCase } = require("../services/analysisService");
const authMiddleware = require("../middleware/middleware");
router.use(authMiddleware);
// Get today's follow-ups
router.get("/today", async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const followUps = await FollowUp.find({
      date: today,
    }).lean();

    return res.status(200).json(followUps);
  } catch (err) {
    console.error("Get today's follow-ups error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch today's follow-ups",
    });
  }
});

// Get all follow-ups
router.get("/", async (req, res) => {
  try {
    const followUps = await FollowUp.find()
      .sort({ date: -1 })
      .lean();

    return res.status(200).json(followUps);
  } catch (err) {
    console.error("Get follow-ups error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch follow-ups",
    });
  }
});

// Add new follow-up
router.post("/", async (req, res) => {
  try {
    const {
      casesId,
      patientName,
      phoneNumber,
      complaint,
      prescription,
      remarks,
      date,
    } = req.body;

    if (!patientName || !date) {
      return res.status(400).json({
        success: false,
        message: "Patient name and date are required",
      });
    }

    if (casesId && !mongoose.isValidObjectId(casesId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid case ID",
      });
    }

    const followUp = new FollowUp({
      ...req.body,
      casesId,
      patientName,
      phoneNumber,
      complaint,
      prescription,
      remarks,
      date,
    });

    await followUp.save();

    if (req.body.reliefStatus === "No Relief") {
      try {
        const analysis = await reanalyzeCase(followUp.casesId);

        followUp.analysis = analysis;
        await followUp.save();
      } catch (analysisError) {
        console.error("Reanalysis failed:", analysisError);
      }
    }

    return res.status(201).json(followUp);

  } catch (err) {
    console.error("Add follow-up error:", err);

    return res.status(400).json({
      success: false,
      message: err.message || "Failed to add follow-up",
    });
  }
});

// Update follow-up
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid follow-up ID",
      });
    }

    let followUp = await FollowUp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!followUp) {
      return res.status(404).json({
        success: false,
        message: "Follow-up not found",
      });
    }

    if (req.body.reliefStatus === "No Relief") {
      try {
        const analysis = await reanalyzeCase(followUp.casesId);

        followUp.analysis = analysis;
        await followUp.save();
      } catch (analysisError) {
        console.error("Reanalysis failed:", analysisError);
      }
    }

    return res.status(200).json(followUp);

  } catch (err) {
    console.error("Update follow-up error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to update follow-up",
    });
  }
});

// Delete follow-up
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid follow-up ID",
      });
    }

    const deleted = await FollowUp.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Follow-up not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Follow-up deleted successfully",
    });

  } catch (err) {
    console.error("Delete follow-up error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to delete follow-up",
    });
  }
});

module.exports = router;

