const express = require("express");
const router = express.Router();
const Material = require("../models/material");

// GET all materials
router.get("/", async (req, res) => {
  const materials = await Material.find();
  res.json(materials);
});

// POST new material
router.post("/add", async (req, res) => {
  try {
    const material = new Material(req.body);
    await material.save();
    res.json({ success: true, material });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE Material
router.delete("/materials/:id", async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, message: "Material nicht gefunden" });
    }
    res.json({ success: true, message: "Material gelöscht" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Fehler beim Löschen" });
  }
});

module.exports = router;