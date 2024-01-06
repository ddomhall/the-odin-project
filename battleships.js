function createShip(length) {
	let hits = 0
	const hit = () => hits++

	let sunk = false
	const isSunk = () => hits >= length ? true : false

	return {length, hit, isSunk}
}

function createBoard() {
	const board = []
	let shipRotation = 'right'
	for (let i = 0; i < 10; i++) {
		const row = []
		for (let j = 0; j < 10; j++) {
			row.push([0])
		}
		board.push(row)
	}

	const placeShip = (ship, x, y, dir) => {
		if (ship.placed == true) console.log('already placed')
		let valid = true

		switch (dir) {
			case 'up':
				for (let i = y; i > y - ship.length; i--) {
					try {
						if (board[i][x] != 0) throw new Error
					} catch {
						valid = false
					}
				}

				if (valid) {
					for (let i = y; i > y - ship.length; i--) {
						board[i][x] = ship
					}
					ship.placed = true
				}
			break;
			case 'right':
				for (let i = x; i < x + ship.length; i++) {
					try {
						if (board[y][i] != 0) throw new Error
					} catch {
						valid = false
					}
				}

				if (valid) {
					for (let i = x; i < x + ship.length; i++) {
						board[y][i] = ship
					}
					ship.placed = true
				}
			break;
			case 'down':
				for (let i = y; i < y + ship.length; i++) {
					try {
						if (board[i][x] != 0) throw new Error
					} catch {
						valid = false
					}
				}

				if (valid) {
					for (let i = y; i < y + ship.length; i++) {
						board[i][x] = ship
					}
					ship.placed = true
				}
			break;
			case 'left':
				for (let i = x; i > x - ship.length; i--) {
					try {
						if (board[y][i] != 0) throw new Error
					} catch {
						valid = false
					}
				}

				if (valid) {
					for (let i = x; i > x - ship.length; i--) {
						board[y][i] = ship
					}
					ship.placed = true
				}
			break;
			default:
				console.log('invalid direction')
			break;
		}
		console.log(board)
	}

	return {placeShip}
}

const b = createBoard()
const s1 = createShip(2)
b.placeShip(s1, 9, 9, 'up')

module.exports = {createShip, createBoard}
