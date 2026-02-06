const express = require("express");
const { getBySku, searchByNamePrefix } = require("../utils/searchIndex");

const router = express.Router();

router.get("/by-id/:sku", (req, res) => {
  const product = getBySku(req.params.sku);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(product);
});

router.get("/by-name", (req, res) => {
  const { prefix = "" } = req.query;
  const results = searchByNamePrefix(prefix);
  res.json(results);
});

module.exports = router;
