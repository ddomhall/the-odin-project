const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Post = require('../models/postModel.js')

router.get('/', async (req, res) => {
	res.json(await Post.find().populate('author').exec())
})

router.post('/', async (req, res) => {
	if (req.body.content) {
		const post = new Post({
			content: req.body.content,
			author: req.body.author,
			date: new Date(),
		}).save()
		res.json({msg: "post created"})
	} else {
		res.status(404).json({msg: 'no content'})
	}
})

router.get('/:id', async (req, res) => {
	res.json(await Post.findOne({_id: req.params.id}).populate('author').exec())
})

module.exports = router

