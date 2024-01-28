const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')

router.get('/', async (req, res) => {
	res.json(await User.find({}, 'username following').exec())
})

router.post('/', async (req, res) => {
	bcrypt.hash(req.body.password, 8, async function(err, hash) {
		if (err) res.status(500)
		const user = await new User({
			username: req.body.username,
			password: hash,
			following: [],
			}).save()
		res.json({msg: 'user created'})
	})
})

module.exports = router
