const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Post = require('../models/postModel.js')
const bcrypt = require('bcryptjs')

router.get('/', async (req, res) => {
	res.json(await User.find({username: req.query.search}).exec())
})

router.post('/', async (req, res) => {
	const existing = await User.findOne({username: req.body.username}).exec()
	if (existing) {
		res.status(403).json({msg: "username taken\n"})
	} else {
		bcrypt.hash(req.body.password, 8, async function(err, hash) {
			if (err) res.status(500).json({msg: "something happened\n"})
			const user = await new User({
				username: req.body.username,
				password: hash,
				following: [],
			}).save()
			res.json(user._id)
		})
	}
})

router.get('/:id', async (req, res) => {
	const user = await User.findOne({_id: req.params.id}).exec()
	if (user) {
		res.json(user)
	} else {
		res.status(404).send('not found')
	}
})

router.get('/:id/posts', async (req, res) => {
	const posts = await Post.find({author: req.params.id}).exec()
	res.json(posts)
})

module.exports = router