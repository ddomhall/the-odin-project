const { capitalize, reverseString, calculator, caesarCipher, analyseArray } = require('./test-practice.js')

test('capitalize', () => {
  expect(capitalize('test')).toBe('Test')
})

test('reverseString', () => {
  expect(reverseString('test')).toBe('tset')
})

test('calculator', () => {
  expect(calculator.add(3, 3)).toBe(6)
  expect(calculator.subtract(3, 3)).toBe(0)
  expect(calculator.divide(3, 3)).toBe(1)
  expect(calculator.multiply(3, 3)).toBe(9)
})

test('caesarCipher', () => {
  expect(caesarCipher('z.a', 1)).toBe('a.b')
})

test('analyseArray', () => {
  expect(analyseArray([0, 1, 2])).toEqual({ average: 1, min: 0, max: 2, length: 3 })
})
