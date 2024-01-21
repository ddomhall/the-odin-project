const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('index'))
app.get('/about', (req, res) => res.send('about'))
app.get('/contact', (req, res) => res.send('contact'))
app.use((req, res, next) => res.status(404).send("404"))

app.listen(3000)
