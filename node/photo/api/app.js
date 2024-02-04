var express = require('express');
var cors = require('cors')
var mongoose = require('mongoose')

const mongoDb = "mongodb+srv://admin:Kil1oP5DcE7scJOT@cluster0.ty3uuu8.mongodb.net/photo?retryWrites=true&w=majority"
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const Character = mongoose.model('Character', new mongoose.Schema({
  name: String,
  x: Number,
  y: Number
}))

const Timing = mongoose.model('Timing', new mongoose.Schema({
  name: String,
  time: Number
}))

var app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let count
let intervalId 

function startTimer() {
  intervalId = setInterval(() => {
    console.log(count)
    count = count + 1
  }, 1000);
}

app.get('/guess', async (req, res) => {
  const guess = await Character.findOne({name: req.query.name}).exec()
  if (Math.abs(guess.x - req.query.x) <= 1 && Math.abs(guess.y - req.query.y) <= 1) {
    res.send('1')
  } else {
    res.send('0')
  }
});

app.get('/timings', async (req, res) => {
  res.json(await Timing.find().exec())
})

app.post('/start', (req, res) => {
  count = 0
  if (!intervalId) startTimer()
})

app.post('/stop', (req, res) => {
  clearInterval(intervalId)
})

app.post('/submit', async (req, res) => {
  await new Timing({name: req.query.name, time: count}).save()
})

app.listen(3000, () => console.log('listening on :3000'))
