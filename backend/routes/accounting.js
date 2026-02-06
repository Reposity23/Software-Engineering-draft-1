const express = require("express");
const { v4: uuidv4 } = require("uuid");
const JournalEntry = require("../models/JournalEntry");

const router = express.Router();

router.get("/ledger", async (req, res) => {
  const entries = await JournalEntry.find().sort({ createdAt: -1 });
  res.json(entries);
});

router.post("/reverse/:entryId", async (req, res) => {
  const entry = await JournalEntry.findById(req.params.entryId);
  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }

  const reversedLines = entry.lines.map((line) => ({
    account: line.account,
    debit: line.credit,
    credit: line.debit,
  }));

  const reversal = await JournalEntry.create({
    entryNo: `JE-${uuidv4().slice(0, 8).toUpperCase()}`,
    sourceType: "Reversal",
    sourceId: entry._id.toString(),
    description: `Reversal of ${entry.entryNo}`,
    lines: reversedLines,
    isReversal: true,
    reversedEntryId: entry._id.toString(),
  });

  res.status(201).json(reversal);
});

module.exports = router;
