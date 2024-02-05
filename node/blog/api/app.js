const express = require('express')
const mongoose = require('mongoose')
const indexRouter = require('./routes/indexRouter.js')
const userRouter = require('./routes/userRouter.js')
const postRouter = require('./routes/postRouter.js')
const commentRouter = require('./routes/commentRouter.js')
const messageRouter = require('./routes/messageRouter.js')
const conversationRouter = require('./routes/conversationRouter.js')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const mongoDb = "mongodb+srv://admin:N9CnomYIFc8TzGVJ@cluster0.ty3uuu8.mongodb.net/blog?retryWrites=true&w=majority"
mongoose.connect(mongoDb)
const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"))

var whitelist = ['http://localhost:3000', 'http://localhost:5173']
var corsOptions = {
	credentials: true,
	exposedHeaders: ["set-cookie"],
	origin: function(origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

const app = express()
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/messages', messageRouter)
app.use('/conversations', conversationRouter)


app.listen(3000, console.log('listening on :3000'))
