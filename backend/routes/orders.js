const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/Order");
const InventoryLog = require("../models/InventoryLog");

const router = express.Router();

router.get("/", async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json(orders);
});

router.post("/", async (req, res) => {
  const { orderNo, customerName, customerAddress, customerContact, lines } = req.body;
  const order = await Order.create({
    orderNo: orderNo || `ORD-${uuidv4().slice(0, 8).toUpperCase()}`,
    customerName,
    customerAddress,
    customerContact,
    status: "Pending Payment",
    lines,
  });
  for (const line of lines) {
    await InventoryLog.create({
      productId: line.productId,
      type: "RESERVE",
      qty: line.qty,
      referenceType: "Order",
      referenceId: order._id.toString(),
    });
  }
  res.status(201).json(order);
});

router.post("/:id/reserve", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  for (const line of order.lines) {
    await InventoryLog.create({
      productId: line.productId,
      type: "RESERVE",
      qty: line.qty,
      referenceType: "Order",
      referenceId: order._id.toString(),
    });
  }
  res.json({ message: "Stock reserved" });
});

router.post("/:id/mark-paid", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: "Paid" },
    { new: true }
  );
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json(order);
});

module.exports = router;
