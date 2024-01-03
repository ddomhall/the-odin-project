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
		if (value == root.data) {
			//top
		}
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
tree.delete(8)
prettyPrint(tree.root)
