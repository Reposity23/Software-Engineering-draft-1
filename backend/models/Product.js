const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  unit: { type: String, default: "pcs" },
  costPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  reorderLevel: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
