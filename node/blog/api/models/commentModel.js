const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	content: {type: String, required: true},
	post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	date: {type: Date, required: true},
})

module.exports = mongoose.model('Comment', commentSchema)


