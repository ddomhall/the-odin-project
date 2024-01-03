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
		// Base case
		if (root === null) {
			return root;
		}

		// Traverse down the tree
		if (value < root.data) {
			root.left = this.delete(value, root.left);
		} else if (value > root.data) {
			root.right = this.delete(value, root.right);
		} 

		// Value matches -> delete node and update pointers
		else {
			// option 1: root(child) has only one child
			if (root.left === null) {
				// return the child's right so new parent can point to it
				return root.right;
			} else if (root.right === null) {
				// return child's left so new parent can point to it
				return root.left;
			}
			// option 2: Node has two children
			else {
				// Replace node with next smallest value
				const minData = function findNextSmallestRightData(root) {
					let min = root.data;
					let newRoot = root;

					// Search for a left node with no left children. 
					while (newRoot.left !== null) {
						min = root.left.data;
						newRoot = root.left;
					}

					return min;
				}

				root.data = minData(root.right);

				// Delete the copied node from minData()
				root.right = this.delete(root.data, root.right)
			}
		}

		return root;
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

tree  = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
prettyPrint(tree.root)
tree.delete(1)
prettyPrint(tree.root)
