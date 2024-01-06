function createShip(length) {
	let hits = 0
	let sunk = false
	const hit = () => hits++
	const getHits = () => hits
	const isSunk = () => hits >= length ? true : false
	return {hit, getHits, isSunk}
}

function createBoard() {
	const board = []
	for (let i = 0; i < 10; i++) {
		const row = []
		for (let j = 0; j < 10; j++) {
			row.push([])
		}
		board.push(row)
	}
	return board
}

module.exports = {createShip, createBoard}
