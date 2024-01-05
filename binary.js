class Node {
	constructor(data, left=null, right=null) {
		this.data = data
		this.left = left
		this.right = right
	}
}

class Tree {
	constructor(arr) {
		this.root = this.buildTree(arr)
	}

	buildTree(arr) {
		arr = [...new Set(arr.sort((a, b) => a - b))]
		if (arr.length < 1) {
			return null
		}
		let mid = arr[Math.trunc(arr.length / 2)]
		let left = this.buildTree(arr.slice(0, Math.trunc(arr.length / 2)))
		let right = this.buildTree(arr.slice(Math.trunc(arr.length / 2) + 1))
		return new Node(mid, left, right)
	}

	insert(value, root=this.root) {
		if (value < root.data) {
			if (root.left == null) {
				root.left = new Node(value)
			} else {
				this.insert(value, root.left)
			}
		} else if (value > root.data) {
			if (root.right == null) {
				root.right = new Node(value)
			} else {
				this.insert(value, root.right)
			}
		} else {
			return
		}
	}

	delete(value, root=this.root) {
		if (root === null) {
			return root;
		}

		if (value < root.data) {
			root.left = this.delete(value, root.left);
		} else if (value > root.data) {
			root.right = this.delete(value, root.right);
		} 

		else {
			if (root.left === null) {
				return root.right;
			} else if (root.right === null) {
				return root.left;
			}
			else {
				const minData = function findNextSmallestRightData(root) {
					let min = root.data;
					let newRoot = root;

					while (newRoot.left !== null) {
						min = root.left.data;
						newRoot = root.left;
					}

					return min;
				}

				root.data = minData(root.right);
				root.right = this.delete(root.data, root.right)
			}
		}

		return root;
	}

	find(value, root=this.root) {
		if (value == root.data) {
			return root
		} else if (value < root.data) {
			return this.find(value, root.left)
		} else if (value > root.data) {
			return this.find(value, root.right)
		} else {
			return 'not found'
		}
	}

	levelOrder(cb='', q=[this.root], v=[]) {
		if (!q[0]) {
			return v
		}

		if (cb) {
			q[0].data = cb(q[0].data)
		} else {
			v.push(q[0].data)
		}

		if (q[0].left) {
			q.push(q[0].left)
		}

		if (q[0].right) {
			q.push(q[0].right)
		}

		q.shift()
		return this.levelOrder(cb, q, v)
	}

	inOrder(cb='', root=this.root, v=[]) {
		if (!root) {
			return
		}

		if (root.left) {
			this.inOrder(cb, root.left, v)
		}

		if (cb) {
			root.data = cb(root.data)
		} else {
			v.push(root.data)
		}

		if (root.right) {
			this.inOrder(cb, root.right, v)
		}

		return v
	}


	preOrder(cb='', root=this.root, v=[]) {
		if (!root) {
			return
		}

		if (cb) {
			root.data = cb(root.data)
		} else {
			v.push(root.data)
		}

		if (root.left) {
			this.preOrder(cb, root.left, v)
		}

		if (root.right) {
			this.preOrder(cb, root.right, v)
		}

		return v
	}


	postOrder(cb='', root=this.root, v=[]) {
		if (!root) {
			return
		}

		if (root.left) {
			this.postOrder(cb, root.left, v)
		}

		if (root.right) {
			this.postOrder(cb, root.right, v)
		}

		if (cb) {
			root.data = cb(root.data)
		} else {
			v.push(root.data)
		}

		return v
	}

	height(n) {
		if (!n) {
			return -1
		}

		let left = this.height(n.left)
		let right = this.height(n.right)
		
		if (left > right) {
			return left + 1
		} else {
			return right + 1
		}
	}

	depth(n, root=this.root, depth=0) {
		if (!root) {
			return
		} else if (n == root) {
			return depth
		}

		if (root.data > n.data) {
			return this.depth(n, root.left, depth += 1)
		} else {
			return this.depth(n, root.right, depth += 1)
		}
	}

	isBalanced(root=this.root) {
		if (!root) {
			return 
		}

		if (Math.abs(this.height(root.left) - this.height(root.right)) > 1) {
			return false
		}

		this.isBalanced(root.left);
		this.isBalanced(root.right);

		if (this.isBalanced(root.left) == false || this.isBalanced(root.right) == false) {
			return false;
		}
		return true;
	}

	rebalance() {
		this.root = this.buildTree(this.levelOrder())
	}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

function tt(n) {
	return n * 2
}

tree  = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
prettyPrint(tree.root)
console.log(tree.isBalanced())
tree.delete(1)
tree.delete(3)
tree.rebalance()
console.log(tree.isBalanced())
prettyPrint(tree.root)
