function createShip(length) {
	let hits = 0
	const hit = () => hits++

	let sunk = false
	const isSunk = () => hits >= length ? true : false

	return {length, hit, isSunk}
}

function createBoard(name) {
	const board = []
	const attacks = []
	const ships = []

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

	return {name, board, attacks, placeShip, recieveAttack, shipsSunk}
}

function createPlayer(name, type) {
	const attack = (board) => {
		let turn = true
		while (turn) {
			let attack
			let x
			let y
			if (type == 'ai') {
				x = Math.trunc(Math.random()*10)
				y = Math.trunc(Math.random()*10)
			} else {
				x = parseInt(prompt('x'))
				y = parseInt(prompt('y'))
			}

			attack = board.recieveAttack(x, y)

			if (attack != 'out' && attack != 'duplicate') {
				turn = false
			}
		}
	}
	return {name, type, attack}
}

function createGame(p1t, p2t) {
	const d = dom()
	const p1 = createPlayer(1, p1t)
	const p2 = createPlayer(2, p2t)
	const b1 = createBoard(1)
	const b2 = createBoard(2)
	const boards = [b1, b2]
	const shipOptions = [2, 3, 3, 4, 5]
	const directions = ['up', 'down', 'left', 'right']
	d.result('')

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

	let winner = false
	let player1turn = true
	while (winner == false) {
		d.renderShips(boards)

		if (p1.type == 'ai' && player1turn) {
			p1.attack(b2)
		} else if (p2.type == 'ai' && !player1turn) {
			p2.attack(b1)
		}

		if (b1.shipsSunk()) {
			winner = p2
		} else if (b2.shipsSunk()) {
			winner = p1
		}
		player1turn = !player1turn
	}
	d.result(`player ${winner.name} wins`)
}

function dom() {
	const boards = document.getElementById('boards')
	const res = document.getElementById('result')
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
					console.log(board)
					build += `<td style="border: solid black 1px; width: 20px; height: 20px" onclick="board.name.recieveAttack(i, j)">${content}</td>`
				}
				build += '</tr>'
			}
			build += '</table><br>'
			boards.insertAdjacentHTML('beforeEnd', build)
		})
	}

	const result = (str) => {
		res.innerHTML = str
	}
	return {renderShips, boards, result}
}

document.getElementById('play').addEventListener('click', e => {
	e.preventDefault()
	createGame(document.getElementById('p1').value, document.getElementById('p2').value)
})

module.exports = {createShip, createBoard, createPlayer, createGame}
