const express = require("express");
const Supplier = require("../models/Supplier");

const router = express.Router();

router.get("/", async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
});

router.post("/", async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ message: "Unable to create supplier" });
  }
});

module.exports = router;
