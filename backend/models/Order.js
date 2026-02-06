const mongoose = require("mongoose");

const orderLineSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerAddress: { type: String },
  customerContact: { type: String },
  status: {
    type: String,
    enum: ["Draft", "Created", "Pending Payment", "Paid", "Released", "Completed", "Void"],
    default: "Created",
  },
  lines: [orderLineSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
