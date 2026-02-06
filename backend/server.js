require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");
const { buildSearchIndex } = require("./utils/searchIndex");

const authRoutes = require("./routes/auth");
const supplierRoutes = require("./routes/suppliers");
const productRoutes = require("./routes/products");
const inventoryRoutes = require("./routes/inventory");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payments");
const accountingRoutes = require("./routes/accounting");
const searchRoutes = require("./routes/search");
const maintenanceRoutes = require("./routes/maintenance");
const reportRoutes = require("./routes/reports");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "JOAP Hardware Trading API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/accounting", accountingRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/reports", reportRoutes);

const port = process.env.PORT || 5000;

connectDb().then(async () => {
  await buildSearchIndex();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${port}`);
  });
});
