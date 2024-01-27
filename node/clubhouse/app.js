const express = require('express')
const app = express()
app.get('/', (req, res, next) => res.send('test'))
app.listen(3000, () => console.log("listening on :3000"));
