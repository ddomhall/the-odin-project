const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	content: {type: String, required: true},
	author: {type: mongoose.Schema.Types.ObjectId, required: true},
	date: {type: Date, required: true},
})

module.exports = mongoose.model('Post', postSchema)

