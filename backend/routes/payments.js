const express = require("express");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const JournalEntry = require("../models/JournalEntry");

const router = express.Router();

const createPaymentEntry = async (payment, order) => {
  const entry = await JournalEntry.create({
    entryNo: `JE-${Date.now()}`,
    sourceType: "PAYMENT",
    sourceId: payment._id.toString(),
    description: `Payment for order ${order.orderNo}`,
    lines: [
      { account: "Cash on Hand", debit: payment.amount, credit: 0 },
      { account: "Sales Revenue", debit: 0, credit: payment.amount }
    ]
  });
  return entry;
};

router.post("/", async (req, res) => {
  try {
    const { orderId, method, gcashRef, amount } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const duplicate = gcashRef ? await Payment.findOne({ gcashRef }) : null;
    const payment = await Payment.create({
      orderId,
      method,
      gcashRef,
      amount,
      flaggedDuplicate: Boolean(duplicate)
    });
    order.status = "Paid";
    await order.save();
    await createPaymentEntry(payment, order);
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: "Unable to log payment" });
  }
});

router.get("/daily-audit", async (req, res) => {
  const date = req.query.date ? new Date(req.query.date) : new Date();
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const payments = await Payment.find({
    createdAt: { $gte: start, $lte: end }
  }).populate("orderId");
  res.json(payments);
});

module.exports = router;
