const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const InventoryLog = require("../models/InventoryLog");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const JournalEntry = require("../models/JournalEntry");

const router = express.Router();
const upload = multer();

router.get("/backup", async (req, res) => {
  const payload = {
    users: await User.find(),
    products: await Product.find(),
    suppliers: await Supplier.find(),
    inventory_logs: await InventoryLog.find(),
    orders: await Order.find(),
    payments: await Payment.find(),
    journal_entries: await JournalEntry.find()
  };
  res.setHeader("Content-Disposition", "attachment; filename=backup.json");
  res.json(payload);
});

router.post("/restore", upload.single("file"), async (req, res) => {
  try {
    const data = JSON.parse(req.file.buffer.toString());
    const mode = req.query.mode || "overwrite";
    if (mode === "overwrite") {
      await Promise.all([
        User.deleteMany({}),
        Product.deleteMany({}),
        Supplier.deleteMany({}),
        InventoryLog.deleteMany({}),
        Order.deleteMany({}),
        Payment.deleteMany({}),
        JournalEntry.deleteMany({})
      ]);
    }
    await User.insertMany(data.users || []);
    await Product.insertMany(data.products || []);
    await Supplier.insertMany(data.suppliers || []);
    await InventoryLog.insertMany(data.inventory_logs || []);
    await Order.insertMany(data.orders || []);
    await Payment.insertMany(data.payments || []);
    await JournalEntry.insertMany(data.journal_entries || []);
    res.json({ message: "Restore complete" });
  } catch (err) {
    res.status(400).json({ message: "Restore failed" });
  }
});

module.exports = router;
