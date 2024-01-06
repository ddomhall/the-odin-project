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
		if (x < 0 || x > 9 || y < 0 || y > 9) {
			return 'out'
		} else if (attacks.includes(x + ',' + y)) {
			return 'duplicate'
		}

		const t = board[y][x]
		if (t != 0) {
			attacks.push(x + ',' + y)
			t.hit()
			return t
		} else {
			attacks.push(x + ',' + y)
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

	return {board, attacks, placeShip, recieveAttack, shipsSunk}
}

function createPlayer(name, type='ai') {
	if (type == 'ai') {
		const aiAttack = () => {
			let turn = true
			let attack
			while (turn) {
				let x = Math.trunc(Math.random()*10)
				let y = Math.trunc(Math.random()*10)
				console.log(x, y)
				if (name == 1) {
					attack = b2.recieveAttack(x, y)
				} else {
					attack = b1.recieveAttack(x, y)

				}
				if (attack != 'out' && attack != 'duplicate') {
					turn = false
				}
			}
		}
		return ({name, type, aiAttack})
	} else {
		return {name, type}
	}
}

const b1 = createBoard()
const b2 = createBoard()
const p1 = createPlayer(1, 'ai')
const p2 = createPlayer(2, '')
p1.aiAttack()
p1.aiAttack()
p1.aiAttack()
console.log(b2.attacks)

module.exports = {createShip, createBoard, createPlayer}
