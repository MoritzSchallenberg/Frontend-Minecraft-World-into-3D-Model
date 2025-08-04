const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  costPerCm3: { type: Number, required: true },
  shortDescription: { type: String, default: "" },  // für Konfigurator
  longDescription: { type: String, default: "" }    // für Produktansicht
});

module.exports = mongoose.model("Material", materialSchema);