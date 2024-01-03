class Node {
	constructor(data, left, right) {
		this.data = data
		this.left = left
		this.right = right
	}
}

class Tree {
	constructor(arr) {
		this.root = buildTree(arr)
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

function buildTree(arr) {
	arr = [...new Set(arr.sort((a, b) => a - b))]
	if (arr.length < 1) {
		return null
	}
	let mid = arr[Math.trunc(arr.length / 2)]
	let left = buildTree(arr.slice(0, Math.trunc(arr.length / 2)))
	let right = buildTree(arr.slice(Math.trunc(arr.length / 2) + 1))
	return new Node(mid, left, right)
}

prettyPrint(new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]).root)
