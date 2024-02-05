const mongoose = require('mongoose')

module.exports = mongoose.model('Comment', new mongoose.Schema({
	content: {type: String, required: true},
	sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	reciever: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	date: {type: Date, required: true},
}))

