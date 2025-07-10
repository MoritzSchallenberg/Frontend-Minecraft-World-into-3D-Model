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

module.exports = router;
