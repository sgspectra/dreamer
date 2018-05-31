var express = require('express');
var router = express.Router();

/* GET the gamepage */
router.get('/', function(req,res,next){
    res.render('game');
});

module.exports = router;