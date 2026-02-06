const mongoose = require("mongoose");
const { getMongoUri } = require("../config/railway");

const connectDb = async () => {
  const mongoUri = getMongoUri();
  try {
    await mongoose.connect(mongoUri);
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
