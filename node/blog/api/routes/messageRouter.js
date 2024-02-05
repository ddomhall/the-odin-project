const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')

router.get('/', (req, res) => {
	res.json({m: 1})
})

module.exports = router

