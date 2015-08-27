var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Calendar' });
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

module.exports = router;
