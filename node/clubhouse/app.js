const express = require('express')
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const mongoDb = "mongodb+srv://admin:3TC2vdxJvezI8ETb@cluster0.ty3uuu8.mongodb.net/clubhouse?retryWrites=true&w=majority"
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const User = mongoose.model(
	"User",
	new Schema({
		username: { type: String, required: true },
		pw: { type: String, required: true },
		member: { type: Boolean, required: true },
	})
);

const app = express()
app.use(express.urlencoded({ extended: false }));

app.set("views", "./views");
app.set('view engine', 'ejs')

let session = false

app.get('/', (req, res, next) => res.render('index', {session}))

app.get('/signup', (req, res, next) => res.render('signup', {user: {username: ''}, errors:''}))

app.post('/signup', [

	body('username', 'username empty').trim().notEmpty().escape().custom(async value => {
		const user = await User.findOne({username: value}).exec()
		if (user) {
			throw new Error('username in use')
		}
	}),
	body('pw', 'invalid password(s)').trim().notEmpty().escape().custom((value, {req}) => {
		return value === req.body.cpw
	}),

	(req, res, next) => {
		const errors = validationResult(req).array()

		bcrypt.hash(req.body.pw, 8, async function(err, hash) {

			const user = new User({
				username: req.body.username,
				pw: hash,
				member: false
			})

			if (errors.length) {
			res.render('signup', {user, errors})
			} else {
				await user.save()
				res.redirect('/')
			}
		})
	}
])

app.get('/login', (req, res, next) => res.render('login', {user: {username: ''}, errors: ''}))

app.post('/login', async (req, res, next) => {
	const user = await User.findOne({username: req.body.username}).exec()
	if (!user) {
		res.render('login', {user: {username: req.body.username}, errors: [{msg: 'username not found'}]})
	} else if (req.body.pw !== user.pw) {
		res.render('login', {user: {username: req.body.username}, errors: [{msg: 'incorrect password'}]})
	} else {
		res.redirect('/')
	}
})

app.listen(3000, () => console.log("listening on :3000"));
