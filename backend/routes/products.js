const express = require("express");
const Product = require("../models/Product");
const { buildSearchIndex } = require("../utils/searchIndex");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    await buildSearchIndex();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Unable to create product" });
  }
});

module.exports = router;
