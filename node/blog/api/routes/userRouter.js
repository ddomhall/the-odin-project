const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')

router.get('/', async (req, res) => {
	res.json(await User.find().exec())
})

router.post('/', async (req, res) => {
	const existing = await User.findOne({username: req.body.username}).exec()
	if (existing) {
		res.status(403).send('username taken\n')
	} else {
		bcrypt.hash(req.body.password, 8, async function(err, hash) {
			if (err) res.status(500).send('something happened\n')
			const user = await new User({
				username: req.body.username,
				password: hash,
				following: [],
			}).save()
			res.json({msg: 'user created'})
		})
	}
})

router.get('/:id', async (req, res) => {
	console.log(req.params.id)
	const user = await User.findOne({username: req.params.id}).exec()
	console.log(user)
	if (user) {
		res.json(user)
	} else {
		res.status(404).send('not found')
	}
})

module.exports = router
