const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Post = require('../models/postModel.js')
const Comment = require('../models/commentModel.js')

router.get('/:id', async (req, res) => {
	res.json(await Comment.findOne({_id: req.params.id}).populate('author').exec())
})

router.put('/:id/edit', async (req, res) => {
	console.log(req.params.id)
	console.log(req.body.content)
	Comment.findByIdAndUpdate(req.params.id, {content: req.body.content}).exec()
})

module.exports = router


