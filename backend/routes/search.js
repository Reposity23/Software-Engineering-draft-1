const express = require("express");
const { buildSearchIndex, searchState } = require("../utils/searchIndex");

const router = express.Router();

const ensureIndex = async () => {
  if (!searchState.lastBuilt) {
    await buildSearchIndex();
  }
};

router.get("/by-id/:sku", async (req, res) => {
  await ensureIndex();
  const product = searchState.idMap.get(req.params.sku);
  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.json(product);
});

router.get("/by-name", async (req, res) => {
  await ensureIndex();
  const prefix = req.query.prefix || "";
  const results = searchState.trie.searchPrefix(prefix).slice(0, 10);
  return res.json(results);
});

module.exports = router;
