const express = require("express");
const Order = require("../models/Order");
const InventoryLog = require("../models/InventoryLog");
const Payment = require("../models/Payment");

const router = express.Router();

router.get("/summary", async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalPaid = await Order.countDocuments({ status: "Paid" });
  const totalSales = await Payment.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  res.json({
    totalOrders,
    totalPaid,
    totalSales: totalSales[0] ? totalSales[0].total : 0
  });
});

router.get("/inventory-movements", async (req, res) => {
  const movements = await InventoryLog.find().sort({ createdAt: -1 }).limit(50);
  res.json(movements);
});

router.get("/sales-summary", async (req, res) => {
  const sales = await Payment.aggregate([
    {
      $group: {
        _id: { $substr: ["$createdAt", 0, 10] },
        total: { $sum: "$amount" },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  res.json(sales);
});

module.exports = router;
