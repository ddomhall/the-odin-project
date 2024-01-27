const express = require('express')
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

app.get('/signup', (req, res, next) => res.render('signup', {session, user: {username: ''}, errors:''}))

app.post('/signup', [

	body('username', 'username empty').trim().notEmpty().escape(),
	body('pw', 'invalid password').trim().isLength({min: 3}).escape(),
	body('cpw', 'passwords must match').custom((value, {req}) => {
		return value === req.body.pw
	}),

	async(req, res, next) => {
		const errors = validationResult(req).array()

		const user = new User({
			username: req.body.username,
			pw: req.body.pw,
			member: false
		})

		if (errors.length) {
			res.render('signup', {session, user, errors})
		} else {
			await user.save()
			res.redirect('/')
		}
	}
])

app.get('/login', (req, res, next) => res.render('login', {session, user: {username: ''}}))

app.listen(3000, () => console.log("listening on :3000"));
