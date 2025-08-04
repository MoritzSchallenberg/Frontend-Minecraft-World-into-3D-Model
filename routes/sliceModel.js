const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const gcodeToGLB = require("../utils/gcodeToGLB");

router.post("/slice-model", upload.single("model"), (req, res) => {
  const inputPath = path.resolve(req.file.path);
  const outputPath = path.resolve(`uploads/${Date.now()}_output.gcode`);

  // CuraEngine Slice Command
  const curaCmd = `curaengine slice -j printer.def.json -o ${outputPath} -l ${inputPath}`;

  exec(curaCmd, async (error, stdout, stderr) => { // <-- async hier hinzufügen
    if (error) {
      console.error(`Slicing error: ${stderr}`);
      return res.status(500).json({ success: false, error: "Slicing failed" });
    }

    // Lese GCode aus
    fs.readFile(outputPath, "utf8", (err, gcodeData) => {
      if (err) return res.status(500).json({ error: "Could not read GCode" });

      // Extrahiere Druckzeit & Volumen aus GCode (vereinfachtes Beispiel)
      const timeMatch = gcodeData.match(/TIME:(\d+)/);
      const timeSec = timeMatch ? parseInt(timeMatch[1]) : 0;
      const hours = (timeSec / 3600).toFixed(1);

      const filamentMatch = gcodeData.match(/Filament used: ([\d\.]+)mm/);
      const filamentMM = filamentMatch ? parseFloat(filamentMatch[1]) : 0;
      const filamentCM3 = (filamentMM / 1000).toFixed(2);

      // Placeholder GLB für animiertes Modell
      const slicedModelUrl = "/assets/sliced-placeholder.glb";

      res.json({
        success: true,
        time: hours,
        volume: filamentCM3,
        slicedModelUrl,
      });

      // Optional: Aufräumen
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
    const glbOutput = path.resolve(`uploads/${Date.now()}_sliced.glb`);
    await gcodeToGLB(outputPath, glbOutput);

    const hours = timeMatch ? parseInt(timeMatch[1]) / 3600 : 0;
    const filamentCM3 = filamentMatch ? parseFloat(filamentMatch[1]) / 1000 : 0;

    res.json({
      success: true,
      time: hours,
      volume: filamentCM3,
      slicedModelUrl: `/uploads/${path.basename(glbOutput)}`
    });
    
  });
});

module.exports = router;