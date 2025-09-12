/** @format */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FollowUp = require("../models/FollowUp");
const { reanalyzeCase } = require("../services/analysisService");
// Get today's follow-ups
router.get("/today", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const followUps = await FollowUp.find({ date: today });
    res.json(followUps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all follow-ups
router.get("/", async (req, res) => {
  try {
    const followUps = await FollowUp.find();
    res.json(followUps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new follow-up
router.post("/", async (req, res) => {
  try {
    const followUp = new FollowUp(req.body);
    await followUp.save();

    if (req.body.reliefStatus === "No Relief") {
      const analysis = await reanalyzeCase(followUp.casesId);
      followUp.analysis = analysis;
      await followUp.save();
    }

    res.status(201).json(followUp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const followUp = await FollowUp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (req.body.reliefStatus === "No Relief" && followUp) {
      const analysis = await reanalyzeCase(followUp.casesId);
      followUp.analysis = analysis;
      await followUp.save();
    }

    res.json(followUp);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete follow-up by ID
router.delete("/:id", async (req, res) => {
  try {
    await FollowUp.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
