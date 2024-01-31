const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userModel.js')
const indexRouter = require('./routes/indexRouter.js')
const userRouter = require('./routes/userRouter.js')
const postRouter = require('./routes/postRouter.js')
const commentRouter = require('./routes/commentRouter.js')
const cors = require('cors')

const mongoDb = "mongodb+srv://admin:UC0LsnHVY2TAtrUM@cluster0.ty3uuu8.mongodb.net/blog?retryWrites=true&w=majority"
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

app.listen(3000, console.log('listening on :3000'))
