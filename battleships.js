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
const s1 = createShip(1)
const s2 = createShip(2)
b.placeShip(s1, 9, 0, 'left')
b.placeShip(s2, 7, 0, 'right')

module.exports = {createShip, createBoard}
