var express = require('express');
var con = require('../modules/console.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dreamer', content: con.content});
});

module.exports = router;
