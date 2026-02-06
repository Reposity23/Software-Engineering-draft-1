const express = require("express");
const Order = require("../models/Order");
const InventoryLog = require("../models/InventoryLog");

const router = express.Router();

router.get("/", async (req, res) => {
  const { status } = req.query;
  const query = status ? { status: new RegExp(status, "i") } : {};
  const orders = await Order.find(query).populate("lines.productId");
  res.json(orders);
});

router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: "Unable to create order" });
  }
});

router.post("/:id/reserve", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const logs = order.lines.map((line) => ({
      productId: line.productId,
      type: "RESERVE",
      qty: line.qty,
      referenceType: "ORDER",
      referenceId: order._id.toString(),
      notes: "Reserved for order"
    }));
    await InventoryLog.insertMany(logs);
    order.status = "Pending Payment";
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: "Unable to reserve order" });
  }
});

router.post("/:id/mark-paid", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  order.status = "Paid";
  await order.save();
  res.json(order);
});

module.exports = router;
