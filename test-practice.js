function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function reverseString(str) {
  return str.split("").reverse().join("")
}

module.exports = {capitalize, reverseString}
