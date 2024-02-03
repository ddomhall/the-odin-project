var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/guess', function(req, res, next) {
  const name = req.query.name
  const x = req.query.x
  const y = req.query.y

  res.json({name, x, y})
});

module.exports = router;
