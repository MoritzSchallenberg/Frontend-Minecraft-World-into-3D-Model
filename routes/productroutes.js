const express = require("express");
const router = express.Router();
const Product = require("./../models/product.js");

// Alle Produkte abrufen
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Neues Produkt hinzufügen
router.post("/add", async (req, res) => {
  const { name, description, price, image } = req.body;
  const product = new Product({ name, description, price });
  await product.save();
  res.json({ success: true, message: "Produkt gespeichert!" });
});

module.exports = router;
