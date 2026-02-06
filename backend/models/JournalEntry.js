const mongoose = require("mongoose");

const journalLineSchema = new mongoose.Schema({
  account: { type: String, required: true },
  debit: { type: Number, default: 0 },
  credit: { type: Number, default: 0 }
});

const journalEntrySchema = new mongoose.Schema({
  entryNo: { type: String, required: true },
  sourceType: { type: String, required: true },
  sourceId: { type: String, required: true },
  description: { type: String },
  lines: [journalLineSchema],
  createdAt: { type: Date, default: Date.now },
  isReversal: { type: Boolean, default: false },
  reversedEntryId: { type: String }
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
