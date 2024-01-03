class Node {
	constructor(value, leftChild, rightChild) {
		this.value = value
		this.leftChild = leftChild
		this.rightChild = rightChild
	}
}

class Tree {
	constructor() {
		this.arr = []
	}
}

function buildTree(arr) {
	return [...new Set(arr.sort((a, b) => a - b))]
}

console.log(buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
