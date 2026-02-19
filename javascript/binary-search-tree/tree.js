class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array = []) {
    const uniqueSorted = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(uniqueSorted);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  insert(value, node = this.root) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    if (value === node.data) {
      return;
    }

    if (value < node.data) {
      if (!node.left) {
        node.left = new Node(value);
      } else {
        this.insert(value, node.left);
      }
    } else if (!node.right) {
      node.right = new Node(value);
    } else {
      this.insert(value, node.right);
    }
  }

  deleteItem(value, node = this.root, parent = null) {
    if (!node) return;

    if (value < node.data) {
      this.deleteItem(value, node.left, node);
      return;
    }

    if (value > node.data) {
      this.deleteItem(value, node.right, node);
      return;
    }

    if (!node.left && !node.right) {
      if (!parent) this.root = null;
      else if (parent.left === node) parent.left = null;
      else parent.right = null;
      return;
    }

    if (!node.left || !node.right) {
      const child = node.left || node.right;
      if (!parent) this.root = child;
      else if (parent.left === node) parent.left = child;
      else parent.right = child;
      return;
    }

    let successorParent = node;
    let successor = node.right;

    while (successor.left) {
      successorParent = successor;
      successor = successor.left;
    }

    node.data = successor.data;

    if (successorParent.left === successor) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
  }

  find(value, node = this.root) {
    if (!node) return null;
    if (value === node.data) return node;
    if (value < node.data) return this.find(value, node.left);
    return this.find(value, node.right);
  }

  levelOrder(callback) {
    if (!this.root) return [];

    const queue = [this.root];
    const values = [];

    while (queue.length) {
      const current = queue.shift();
      if (callback) callback(current);
      else values.push(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return callback ? undefined : values;
  }

  inOrder(callback, node = this.root, values = []) {
    if (!node) return values;

    this.inOrder(callback, node.left, values);
    if (callback) callback(node);
    else values.push(node.data);
    this.inOrder(callback, node.right, values);

    return callback ? undefined : values;
  }

  preOrder(callback, node = this.root, values = []) {
    if (!node) return values;

    if (callback) callback(node);
    else values.push(node.data);
    this.preOrder(callback, node.left, values);
    this.preOrder(callback, node.right, values);

    return callback ? undefined : values;
  }

  postOrder(callback, node = this.root, values = []) {
    if (!node) return values;

    this.postOrder(callback, node.left, values);
    this.postOrder(callback, node.right, values);
    if (callback) callback(node);
    else values.push(node.data);

    return callback ? undefined : values;
  }

  height(node) {
    if (!node) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node, current = this.root, edges = 0) {
    if (!current || !node) return null;
    if (current === node) return edges;
    if (node.data < current.data) return this.depth(node, current.left, edges + 1);
    return this.depth(node, current.right, edges + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    this.root = this.buildTree(this.inOrder());
  }
}

module.exports = { Tree, Node };
