function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function reverseString(str) {
  return str.split("").reverse().join("")
}

const calculator = {
  add(n1, n2) {
	return n1 + n2
  },

  subtract(n1, n2) {
	return n1 - n2
  },

  divide(n1, n2) {
	return n1 / n2
  },

  multiply(n1, n2) {
	return n1 * n2
  }
}

function caesarCipher(str) {
  const lower = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  let out = ""

  str.split("").forEach(l => {
	if (lower.includes(l)) {
	  let i = lower.indexOf(l)

	  if (i == 25) {
		out += 'a'
	  } else {
		out += lower[i+1]
	  }
	} else if (upper.includes(l)) {
	  let i = upper.indexOf(l)

	  if (i == 25) {
		out += 'A'
	  } else {
		out += upper[i+1]
	  }
	} else {
	  out += l
	}
  })
  return out
}

function analyseArray(arr) {
  const average = arr.reduce((prev, cur) => cur + prev, 0) / arr.length
  const min = arr.reduce((prev, cur) => cur < prev ? cur : prev, arr[0])
  const max = arr.reduce((prev, cur) => cur > prev ? cur : prev, arr[0])
  const length = arr.length
  return {average, min, max, length}
}

module.exports = {capitalize, reverseString, calculator, caesarCipher, analyseArray}
