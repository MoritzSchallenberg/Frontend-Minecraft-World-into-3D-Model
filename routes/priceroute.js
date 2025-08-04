const express = require("express");
const multer = require("multer");
const stlVolume = require("stl-volume"); // ggf. extern oder STL-Parser verwenden

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/calculate-price", upload.single("model"), async (req, res) => {
  try {
    const stlBuffer = req.file.buffer;

    // Beispielwerte
    const volume = await stlVolume(stlBuffer); // in cm³
    const materialPreis = 0.10; // €/cm³
    const druckzeitMin = volume / 2; // einfache Annahme: 2 cm³/min

    let basis = volume * materialPreis;
    const aufpreis = Math.ceil((basis * 0.3) * 100); // 30 % Aufpreis

    // Aufrundung auf .24 / .49 / .74 / .99
    const cent = [24, 49, 74, 99];
    const centRundung = cent.find(c => (aufpreis % 100) <= c) || 99;
    const final = Math.floor(aufpreis / 100) + centRundung / 100;

    res.json({
      volumen: volume.toFixed(2),
      druckzeit: Math.ceil(druckzeitMin),
      basisPreis: basis.toFixed(2),
      gesamtPreis: final.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ error: "Berechnung fehlgeschlagen" });
  }
});

module.exports = router;