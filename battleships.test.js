describe('battleships', () => {
	const {createShip, createBoard} = require('./battleships.js')

	test('create ship', () => {
		const s = createShip(1)
		expect(s.isSunk()).toBe(false)
		s.hit()
		expect(s.isSunk()).toBe(true)
	})

	test('create board', () => {
		const board = []
		for (let i = 1; i <= 10; i++) {
			const row = []
			for (let j = 1; j <= 10; j++) {
				row.push([])
			}
			board.push(row)
		}
		expect(createBoard()).toEqual(board)
	})
})
