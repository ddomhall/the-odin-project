const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')

router.get('/', async (req, res) => {
	res.json(await User.find({}, 'username following').exec())
})

router.post('/', async (req, res) => {
	const user = await new User({
		username: req.body.username,
		password: req.body.password,
		following: [],
	}).save()
	res.json({msg: 'user created'})
})

module.exports = router
