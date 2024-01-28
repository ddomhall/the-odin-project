const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
	const user = await User.findOne({username: req.body.username}).exec()
	bcrypt.compare(req.body.password, user.password, function(err, result) {
		if (err) res.status(500)
		res.json({result})
	})
})

module.exports = router
