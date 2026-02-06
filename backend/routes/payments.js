const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const JournalEntry = require("../models/JournalEntry");

const router = express.Router();

router.post("/", async (req, res) => {
  const { orderId, method, gcashRef, amount } = req.body;
  const existing = await Payment.findOne({ gcashRef });
  const payment = await Payment.create({
    orderId,
    method,
    gcashRef,
    amount,
    flaggedDuplicate: Boolean(existing),
  });

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status: "Paid" },
    { new: true }
  );

  const journalEntry = await JournalEntry.create({
    entryNo: `JE-${uuidv4().slice(0, 8).toUpperCase()}`,
    sourceType: "Payment",
    sourceId: payment._id.toString(),
    description: `Payment received for order ${order?.orderNo || orderId}`,
    lines: [
      { account: "Cash", debit: amount, credit: 0 },
      { account: "Sales", debit: 0, credit: amount },
    ],
  });

  res.status(201).json({ payment, order, journalEntry });
});

router.get("/daily-audit", async (req, res) => {
  const { date } = req.query;
  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);
  const payments = await Payment.find({
    createdAt: { $gte: start, $lt: end },
  }).populate("orderId");
  res.json(payments);
});

module.exports = router;
