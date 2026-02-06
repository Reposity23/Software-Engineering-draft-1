const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const railway = require("./config/railway");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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
const { buildSearchIndex } = require("./utils/searchIndex");

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

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || railway.mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    buildSearchIndex().catch((err) => {
      console.error("Search index build failed:", err.message);
    });
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
