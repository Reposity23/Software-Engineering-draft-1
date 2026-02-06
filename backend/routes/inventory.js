const express = require("express");
const InventoryLog = require("../models/InventoryLog");
const Product = require("../models/Product");

const router = express.Router();

const computeStock = (logs) => {
  const totals = {};
  logs.forEach((log) => {
    const key = log.productId.toString();
    if (!totals[key]) {
      totals[key] = 0;
    }
    if (log.type === "IN" || log.type === "ADJ") {
      totals[key] += log.qty;
    }
    if (log.type === "OUT" || log.type === "RESERVE") {
      totals[key] -= log.qty;
    }
  });
  return totals;
};

router.get("/summary", async (req, res) => {
  const logs = await InventoryLog.find();
  const products = await Product.find();
  const totals = computeStock(logs);
  const summary = products.map((product) => {
    const stock = totals[product._id.toString()] || 0;
    return {
      product,
      stock,
      lowStock: stock <= product.reorderLevel
    };
  });
  res.json(summary);
});

router.post("/logs", async (req, res) => {
  try {
    const log = await InventoryLog.create(req.body);
    res.json(log);
  } catch (err) {
    res.status(400).json({ message: "Unable to log inventory" });
  }
});

router.post("/adjust", async (req, res) => {
  try {
    const log = await InventoryLog.create({
      ...req.body,
      type: "ADJ"
    });
    res.json(log);
  } catch (err) {
    res.status(400).json({ message: "Unable to create adjustment" });
  }
});

module.exports = router;
