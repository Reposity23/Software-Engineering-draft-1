const mongoose = require("mongoose");

const inventoryLogSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  type: { type: String, enum: ["IN", "OUT", "ADJ", "RESERVE"], required: true },
  qty: { type: Number, required: true },
  referenceType: { type: String },
  referenceId: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InventoryLog", inventoryLogSchema);
