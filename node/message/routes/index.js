var express = require('express');
var router = express.Router();

const messages = [
  {
    text: 'hi there',
    user: 'amando',
    added: new Date()
  },
  {
    text: 'hello world',
    user: 'charles',
    added: new Date()
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'message', messages: messages });
});

module.exports = router;
