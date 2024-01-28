const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Post = require('../models/postModel.js')

router.get('/', async (req, res) => {
	res.json(await Post.find().populate('author').exec())
})

router.post('/', async(req, res) => {
	const post = new Post({
		content: req.body.content,
		author: await User.findOne().exec(),
		date: new Date(),
	}).save()
	res.json({msg: "post created"})
})

module.exports = router

