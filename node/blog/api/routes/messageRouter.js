const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Message = require('../models/messageModel.js')
const Conversation = require('../models/conversationModel.js')

router.post('/', async (req, res) => {
	// await new Message({content: 'test', sender: req.cookies.session, users: [req.cookies.session], time: new Date()}).save()
	res.json({m: 1})
})

module.exports = router

