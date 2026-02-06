const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  method: { type: String, required: true },
  gcashRef: { type: String, required: true },
  amount: { type: Number, required: true },
  flaggedDuplicate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

paymentSchema.index({ gcashRef: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
