const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Conversation = require('../models/conversationModel.js')

router.post('/', async (req, res) => {
	let conversation = await Conversation.findOne({users: [req.cookies.session, req.body.recipient]})
	if (conversation) {
	} else {
		conversation = await new Conversation({users: [req.cookies.session, req.body.recipient]}).save()
	}
	res.json(conversation)
})

module.exports = router


