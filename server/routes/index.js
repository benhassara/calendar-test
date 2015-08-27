var express = require('express');
var router = express.Router();
var utility = require('../logic/utility');

var response;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Calendar' });
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.post('/add', function(req, res, next) {
  response = utility.postHandler(req.body);
  res.redirect('/');
});

module.exports = router;
