const express = require('express')
const app = express()
app.set("views", "./views");
app.set('view engine', 'ejs')
let session = false
let user = {fname: '', lname: '', email: ''}
app.get('/', (req, res, next) => res.render('index', {user}))
app.get('/signup', (req, res, next) => res.render('signup', {session, user}))
app.get('/login', (req, res, next) => res.render('login', {user}))
app.listen(3000, () => console.log("listening on :3000"));
