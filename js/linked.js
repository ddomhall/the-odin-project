class Node {
	constructor(value) {
		this.value = value
		this.nextNode = null
	}
}

class LinkedList {
	constructor() {
		this.head = null
	}

	append(value) {
		if (this.head == null) {
			this.head = value
		} else {
			let target = this.head
			while (target.nextNode != null) {
				target = target.nextNode
			}
			target.nextNode = value
		}
	}

	prepend(value) {
		if (this.head == null) {
			this.head = value
		} else {
			value.nextNode = this.head
			this.head = value
		}
	}

	size() {
		let count = 0
		let target = this.head
		while (target != null) {
			count += 1
			target = target.nextNode
		}
		return count
	}

	head() {
		return(this.head)
	}

	tail() {
		let target = this.head
		while (target.nextNode != null) {
			target = target.nextNode
		}
		return target
	}

	at(index) {
		let target = this.head
		for (let i = 0; i < index; i++) {
			target = target.nextNode
		}
		return target
	}

	pop() {
		let target = this.head
		while (target.nextNode.nextNode != null) {
			target = target.nextNode
		}
		target.nextNode = null
	}

	contains(value) {
		let target = this.head
		while (target != null) {
			if (target.value == value) {
				return true
			}
			target = target.nextNode
		}
		return false
	}

	find(value) {
		let target = this.head
		let count = 0
		while (target != null) {
			if (target.value == value) {
				return count
			} else {
				target = target.nextNode
				count += 1
			}
		}
	}

	toString() {
		let str = '' 
		let target = this.head
		while (target != null) {
			str += `( ${target.value} ) -> ` 
			target = target.nextNode
		}
		return str + 'null'
	}
}
