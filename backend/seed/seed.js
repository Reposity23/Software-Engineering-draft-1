const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const railway = require("../config/railway");
const User = require("../models/User");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const InventoryLog = require("../models/InventoryLog");

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || railway.mongoUri);
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Supplier.deleteMany({}),
    InventoryLog.deleteMany({})
  ]);

  const [ownerHash, employeeHash] = await Promise.all([
    bcrypt.hash("owner123", 10),
    bcrypt.hash("employee123", 10)
  ]);

  await User.insertMany([
    { name: "JOAP Owner", email: "owner@joap.local", role: "owner", passwordHash: ownerHash },
    { name: "JOAP Employee", email: "employee@joap.local", role: "employee", passwordHash: employeeHash }
  ]);

  const suppliers = await Supplier.insertMany([
    { name: "North Tools Supply", contact: "Ramon Dela Cruz", phone: "09171234567" },
    { name: "Metro Hardware Hub", contact: "Ana Lim", phone: "09998887777" }
  ]);

  const products = await Product.insertMany([
    {
      sku: "JOAP-001",
      name: "Hammer 16oz",
      unit: "pcs",
      costPrice: 120,
      salePrice: 180,
      reorderLevel: 5
    },
    {
      sku: "JOAP-002",
      name: "Philips Screwdriver",
      unit: "pcs",
      costPrice: 60,
      salePrice: 90,
      reorderLevel: 8
    },
    {
      sku: "JOAP-003",
      name: "PVC Pipe 1/2 inch",
      unit: "pcs",
      costPrice: 45,
      salePrice: 75,
      reorderLevel: 20
    }
  ]);

  await InventoryLog.insertMany([
    {
      productId: products[0]._id,
      type: "IN",
      qty: 8,
      referenceType: "SEED",
      referenceId: "seed",
      notes: "Initial stock"
    },
    {
      productId: products[1]._id,
      type: "IN",
      qty: 3,
      referenceType: "SEED",
      referenceId: "seed",
      notes: "Initial low stock"
    }
  ]);

  console.log("Seed complete");
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
