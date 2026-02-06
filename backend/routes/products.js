const express = require("express");
const Product = require("../models/Product");
const { buildSearchIndex } = require("../utils/searchIndex");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  await buildSearchIndex();
  res.status(201).json(product);
});

module.exports = router;
