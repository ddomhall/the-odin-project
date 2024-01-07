describe('battleships', () => {
	const {createShip, createBoard, createPlayer} = require('./battleships.js')

	test('create ship', () => {
		const s = createShip(1)
		expect(s.length).toBe(1)
		expect(s.isSunk()).toBe(false)
		s.hit()
		expect(s.isSunk()).toBe(true)
	})

	test('place and attack ships', () => {
		const b = createBoard()
		const s1 = createShip(1)
		b.placeShip(s1, 0, 0, 'up')
		expect(b.recieveAttack(0, 0)).toEqual(s1)
		expect(b.recieveAttack(0, 1)).toBe('miss')
		expect(b.recieveAttack(0, 1)).toBe('duplicate')
		expect(b.shipsSunk()).toBe(true)
	})

	test('player attacks', () => {
		const p1 = createPlayer(1, 'ai')
		const b2 = createBoard()
		p1.aiAttack()
		expect(b2.attacks).toEqual([])
	})
})
