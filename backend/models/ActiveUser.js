const mongoose = require("mongoose");

const activeUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lastSeen: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ActiveUser", activeUserSchema);
