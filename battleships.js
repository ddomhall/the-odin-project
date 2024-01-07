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
		if (ship.placed == true) return false
		let valid = true

		switch (dir) {
			case 'up':
				for (let i = y; i > y - ship.length; i--) {
					try {
						if (i < 0 || i > 9 || x < 0 || x > 9 || board[i][x] != 0) throw new Error
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
					return true
				}
			break;

			case 'down':
				for (let i = y; i < y + ship.length; i++) {
					try {
						if (i < 0 || i > 9 || x < 0 || x > 9 || board[i][x] != 0) throw new Error
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
					return true
				}
			break;

			case 'left':
				for (let i = x; i > x - ship.length; i--) {
					try {
						if (i < 0 || i > 9 || y < 0 || y > 9 || board[y][i] != 0) throw new Error
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
					return true
				}
			break;

			case 'right':
				for (let i = x; i < x + ship.length; i++) {
					try {
						if (i < 0 || i > 9 || y < 0 || y > 9 || board[y][i] != 0) throw new Error
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
					return true
				}
			break;

			default:
				return false
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

function createPlayer(name, type) {
	if (type == 'ai') {
		const aiAttack = () => {
			let turn = true
			let attack
			while (turn) {
				let x = Math.trunc(Math.random()*10)
				let y = Math.trunc(Math.random()*10)
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

function createGame() {
	const p1 = createPlayer(1, 'ai')
	const p2 = createPlayer(2, 'ai')
	const b1 = createBoard()
	const b2 = createBoard()
	const boards = [b1, b2]
	const shipOptions = [2, 3, 3, 4, 5]
	const directions = ['up', 'down', 'left', 'right']
	boards.forEach(board => {
		shipOptions.forEach(opt => {
			let valid = false
			while (!valid) {
				let placement = board.placeShip(createShip(opt), Math.trunc(Math.random() * 10), Math.trunc(Math.random() * 10), directions[Math.trunc(Math.random() * directions.length)])
				if (placement) {
					valid = true
				}
				
			}
		})
	})
	const d = dom()
	b1.recieveAttack(0, 0)
	b1.recieveAttack(1, 0)
	b1.recieveAttack(2, 0)
	b1.recieveAttack(3, 0)
	b1.recieveAttack(4, 0)
	b1.recieveAttack(5, 0)
	b1.recieveAttack(6, 0)
	b1.recieveAttack(7, 0)
	b1.recieveAttack(8, 0)
	b1.recieveAttack(9, 0)
	d.renderShips(boards)
}

function dom() {
	const boards = document.getElementById('boards')
	const renderShips = (arr) => {
		boards.innerHTML = ""
		arr.forEach(board => {
			let build = '<table>'
			for (let i = 0; i < 10; i++) {
				build += '<tr>'
				for (let j = 0; j < 10; j++) {
					let content
					if (board.attacks.includes(j + ',' + i) && board.board[i][j] != 0) {
						content = board.board[i][j].length + 'x'
					} else if (board.attacks.includes(j + ',' + i)) {
						content = 'o'
					} else if (board.board[i][j] == 0) {
						content = ""
					} else {
						content = board.board[i][j].length
					}
					build += `<td style="border: solid black 1px; width: 20px; height: 20px">${content}</td>`
				}
				build += '</tr>'
			}
			build += '</table><br>'
			boards.insertAdjacentHTML('beforeEnd', build)
		})
	}
	return {renderShips}
}

createGame()

module.exports = {createShip, createBoard, createPlayer}
