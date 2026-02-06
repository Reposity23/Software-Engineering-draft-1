require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDb = require("../utils/db");
const User = require("../models/User");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const InventoryLog = require("../models/InventoryLog");

const seed = async () => {
  await connectDb();
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Supplier.deleteMany({}),
    InventoryLog.deleteMany({}),
  ]);

  const [ownerPass, employeePass] = await Promise.all([
    bcrypt.hash("owner123", 10),
    bcrypt.hash("employee123", 10),
  ]);

  await User.insertMany([
    {
      name: "JOAP Owner",
      email: "owner@joap.local",
      role: "Owner",
      passwordHash: ownerPass,
    },
    {
      name: "JOAP Employee",
      email: "employee@joap.local",
      role: "Employee",
      passwordHash: employeePass,
    },
  ]);

  const products = await Product.insertMany([
    {
      sku: "JOAP-001",
      name: "Premium Steel Hammer",
      unit: "pcs",
      costPrice: 180,
      salePrice: 250,
      reorderLevel: 5,
    },
    {
      sku: "JOAP-002",
      name: "Heavy Duty Drill",
      unit: "pcs",
      costPrice: 1200,
      salePrice: 1650,
      reorderLevel: 3,
    },
  ]);

  await Supplier.insertMany([
    {
      name: "Manila Tools Supply",
      contact: "Rico Santos",
      phone: "09171234567",
      email: "rico@manilatools.local",
      address: "Manila City",
    },
  ]);

  await InventoryLog.insertMany([
    {
      productId: products[0]._id,
      type: "IN",
      qty: 10,
      referenceType: "Initial Stock",
      notes: "Seed stock",
    },
    {
      productId: products[1]._id,
      type: "IN",
      qty: 4,
      referenceType: "Initial Stock",
      notes: "Seed stock",
    },
  ]);

  // eslint-disable-next-line no-console
  console.log("Seed complete");
  process.exit(0);
};

seed();
