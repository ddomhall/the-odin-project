const express = require('express')
const { body, validationResult } = require('express-validator');
const app = express()
app.use(express.urlencoded({ extended: false }));

app.set("views", "./views");
app.set('view engine', 'ejs')

let session = false
let user = {fname: '', lname: '', email: ''}

app.get('/', (req, res, next) => res.render('index', {session}))

app.get('/signup', (req, res, next) => res.render('signup', {session, user, errors:''}))

app.post('/signup', [

	body('fname', 'first name empty').trim().notEmpty().escape(),
	body('lname', 'last name empty').trim().notEmpty().escape(),
	body('email', 'invalid email').trim().isEmail().escape(),
	body('pw', 'invalid password').trim().isLength({min: 3}).escape(),
	body('cpw', 'invalid password').trim().isLength({min: 3}).escape(),

	async(req, res, next) => {
		const errors = validationResult(req).array()

		user = {
			fname: req.body.fname,
			lname: req.body.lname,
			email: req.body.email,
		}

		if (errors.length || req.body.pw != req.body.cpw) {
			if (req.body.pw != req.body.cpw) {
				errors.push({msg: 'passwords must match'})
			}
			res.render('signup', {session, user, errors})
		} else {
			res.redirect('/')
		}
	}
])

app.get('/login', (req, res, next) => res.render('login', {session, user}))

app.listen(3000, () => console.log("listening on :3000"));
