const express = require('express')
const app = express()
app.set("views", "./views");
app.set('view engine', 'ejs')
let user = false
app.get('/', (req, res, next) => res.render('index', {user}))
app.get('/signup', (req, res, next) => res.render('signup', {user}))
app.get('/login', (req, res, next) => res.render('login', {user}))
app.listen(3000, () => console.log("listening on :3000"));
