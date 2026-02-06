const Product = require("../models/Product");

class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
    this.items = [];
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, payload) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
      node.items.push(payload);
    }
    node.isEnd = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return node.items;
  }
}

const searchState = {
  idMap: new Map(),
  trie: new Trie(),
  lastBuilt: null
};

const buildSearchIndex = async () => {
  const products = await Product.find();
  const idMap = new Map();
  const trie = new Trie();
  products.forEach((product) => {
    idMap.set(product.sku, product);
    trie.insert(product.name, product);
  });
  searchState.idMap = idMap;
  searchState.trie = trie;
  searchState.lastBuilt = new Date();
  return searchState;
};

module.exports = {
  buildSearchIndex,
  searchState
};
