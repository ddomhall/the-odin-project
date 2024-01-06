function createShip(length) {
	let hits = 0
	const hit = () => hits++

	let sunk = false
	const isSunk = () => hits >= length ? true : false

	return {length, hit, isSunk}
}

function createBoard() {
	const board = []
	const attacks = []
	const ships = []
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
					ships.push(ship)
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
					ships.push(ship)
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
					ships.push(ship)
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
					ships.push(ship)
				}
			break;
			default:
				console.log('invalid direction')
			break;
		}
	}

	const recieveAttack = (x, y) => {
		const t = board[y][x]
		try {
			if (attacks.includes(x + ',' + y)) {
				return 'duplicate'
			} else if (t != 0) {
				t.hit()
				return t
			} else {
				attacks.push(x + ',' + y)
				throw new Error
			}
		} catch {
			return 'miss'
		}
	}

	const shipsSunk = () => {
		let allSunk = true
		ships.forEach(ship => {
			if (!ship.isSunk()) {
				allSunk = false
			}
		})
		return allSunk
	}

	return {board, placeShip, recieveAttack, shipsSunk}
}

function createPlayer() {
	return 0
}

const b = createBoard()
b.recieveAttack(0, 0)

module.exports = {createShip, createBoard, createPlayer}
