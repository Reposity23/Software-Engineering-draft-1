class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
    this.values = [];
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, value) {
    let node = this.root;
    const normalized = word.toLowerCase();
    for (const ch of normalized) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEnd = true;
    node.values.push(value);
  }

  searchPrefix(prefix) {
    let node = this.root;
    const normalized = prefix.toLowerCase();
    for (const ch of normalized) {
      if (!node.children[ch]) {
        return [];
      }
      node = node.children[ch];
    }
    return this.collect(node);
  }

  collect(node, results = []) {
    if (node.isEnd) {
      results.push(...node.values);
    }
    for (const key of Object.keys(node.children)) {
      this.collect(node.children[key], results);
    }
    return results;
  }
}

module.exports = Trie;
