const Product = require("../models/Product");
const Trie = require("./trie");

const searchState = {
  skuMap: new Map(),
  trie: new Trie(),
};

const buildSearchIndex = async () => {
  const products = await Product.find();
  searchState.skuMap = new Map();
  searchState.trie = new Trie();
  products.forEach((product) => {
    searchState.skuMap.set(product.sku, product);
    searchState.trie.insert(product.name, product);
  });
};

const getBySku = (sku) => searchState.skuMap.get(sku) || null;
const searchByNamePrefix = (prefix) => searchState.trie.searchPrefix(prefix);

module.exports = {
  buildSearchIndex,
  getBySku,
  searchByNamePrefix,
};
