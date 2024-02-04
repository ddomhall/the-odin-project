var express = require('express');
var cors = require('cors')
var mongoose = require('mongoose')

const mongoDb = "mongodb+srv://admin:Kil1oP5DcE7scJOT@cluster0.ty3uuu8.mongodb.net/photo?retryWrites=true&w=majority"
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const characterSchema = new mongoose.Schema({
  name: String,
  x: Number,
  y: Number
})

const Character = mongoose.model('Character', characterSchema)

var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/guess', async function(req, res, next) {
  const guess = await Character.findOne({name: req.query.name}).exec()
  if (Math.abs(guess.x - req.query.x) <= 1 && Math.abs(guess.y - req.query.y) <= 1) {
    res.send('1')
  } else {
    res.send('0')
  }
});

app.listen(3000, () => console.log('listening on :3000'))
