const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Post = require('../models/postModel.js')
const Comment = require('../models/commentModel.js')

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

router.get('/:id/comments', async (req, res) => {
	res.json(await Comment.find({post: req.params.id}).populate('author').exec())
})

router.post('/:id/comments', async (req, res) => {
	if (req.body.content && req.body.author) {
		const comment = new Comment({
			content: req.body.content,
			author: req.body.author,
			post: req.params.id,
			date: new Date()
		}).save()
		res.json({msg: "comment created"})
	} else {
		res.json({m: 'no content'})
	}
})

module.exports = router

