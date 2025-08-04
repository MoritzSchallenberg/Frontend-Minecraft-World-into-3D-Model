const express = require("express");
const router = express.Router();
const Product = require("./../models/product");

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Produkt nicht gefunden" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Abrufen des Produkts" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Produkt nicht gefunden" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Aktualisieren" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Produkt erfolgreich gelöscht." });
  } catch (err) {
    res.status(500).json({ success: false, error: "Fehler beim Löschen" });
  }
});

module.exports = router;