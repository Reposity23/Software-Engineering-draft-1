const express = require("express");
const InventoryLog = require("../models/InventoryLog");
const Product = require("../models/Product");

const router = express.Router();

const computeInventorySummary = async () => {
  const products = await Product.find();
  const logs = await InventoryLog.find();
  const summaryMap = new Map();
  products.forEach((product) => {
    summaryMap.set(product._id.toString(), {
      product,
      stock: 0,
      status: "OK",
    });
  });
  logs.forEach((log) => {
    const entry = summaryMap.get(log.productId.toString());
    if (!entry) return;
    if (log.type === "IN" || log.type === "ADJ") {
      entry.stock += log.qty;
    }
    if (log.type === "OUT" || log.type === "RESERVE") {
      entry.stock -= log.qty;
    }
  });
  summaryMap.forEach((entry) => {
    if (entry.product.reorderLevel && entry.stock <= entry.product.reorderLevel) {
      entry.status = entry.stock <= 0 ? "Critical" : "Low Stock";
    }
  });
  return Array.from(summaryMap.values());
};

router.get("/summary", async (req, res) => {
  const summary = await computeInventorySummary();
  res.json(summary);
});

router.post("/logs", async (req, res) => {
  const log = await InventoryLog.create(req.body);
  res.status(201).json(log);
});

router.post("/adjust", async (req, res) => {
  const { productId, qty, notes } = req.body;
  const log = await InventoryLog.create({
    productId,
    qty,
    type: "ADJ",
    notes,
    referenceType: "Adjusting Entry",
  });
  res.status(201).json(log);
});

module.exports = router;
