const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userModel.js')

const mongoDb = "mongodb+srv://admin:UC0LsnHVY2TAtrUM@cluster0.ty3uuu8.mongodb.net/blog?retryWrites=true&w=majority"
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express()

app.get('/users', async (req, res) => {
	const users = await User.find({}, 'username following').exec()
	res.json(users)
})

app.post('/users', async (req, res) => {
	const user = new User({
		username: 'u1',
		password: 'p1',
		following: [],
	})
	await user.save()
	res.json({msg: 'user created'})
})

app.listen(3000, console.log('listening on :3000'))
