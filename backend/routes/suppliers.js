const express = require("express");
const Supplier = require("../models/Supplier");

const router = express.Router();

router.get("/", async (req, res) => {
  const suppliers = await Supplier.find().sort({ createdAt: -1 });
  res.json(suppliers);
});

router.post("/", async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).json(supplier);
});

module.exports = router;
