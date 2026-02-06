const express = require("express");
const Order = require("../models/Order");
const InventoryLog = require("../models/InventoryLog");
const Payment = require("../models/Payment");

const router = express.Router();

router.get("/summary", async (req, res) => {
  const [orders, payments] = await Promise.all([
    Order.countDocuments(),
    Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
  ]);
  res.json({
    totalOrders: orders,
    totalSales: payments[0]?.total || 0,
  });
});

router.get("/inventory-movements", async (req, res) => {
  const logs = await InventoryLog.find().sort({ createdAt: -1 }).limit(50);
  res.json(logs);
});

router.get("/sales-summary", async (req, res) => {
  const sales = await Payment.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json(sales);
});

module.exports = router;
