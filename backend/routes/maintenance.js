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
  const data = {
    users: await User.find(),
    products: await Product.find(),
    suppliers: await Supplier.find(),
    inventory_logs: await InventoryLog.find(),
    orders: await Order.find(),
    payments: await Payment.find(),
    journal_entries: await JournalEntry.find(),
    exportedAt: new Date().toISOString(),
  };
  res.setHeader("Content-Disposition", "attachment; filename=backup.json");
  res.json(data);
});

router.post("/restore", upload.single("file"), async (req, res) => {
  const payload = JSON.parse(req.file.buffer.toString());
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Supplier.deleteMany({}),
    InventoryLog.deleteMany({}),
    Order.deleteMany({}),
    Payment.deleteMany({}),
    JournalEntry.deleteMany({}),
  ]);

  const results = {};
  if (payload.users) results.users = await User.insertMany(payload.users);
  if (payload.products) results.products = await Product.insertMany(payload.products);
  if (payload.suppliers) results.suppliers = await Supplier.insertMany(payload.suppliers);
  if (payload.inventory_logs)
    results.inventory_logs = await InventoryLog.insertMany(payload.inventory_logs);
  if (payload.orders) results.orders = await Order.insertMany(payload.orders);
  if (payload.payments) results.payments = await Payment.insertMany(payload.payments);
  if (payload.journal_entries)
    results.journal_entries = await JournalEntry.insertMany(payload.journal_entries);

  res.json({ message: "Restore complete", results });
});

module.exports = router;
