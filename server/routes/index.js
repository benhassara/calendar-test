var express = require('express');
var router = express.Router();
var utility = require('../logic/utility');
var mongoose = require('mongoose');
var CalEvent = mongoose.model('CalEvent');

var response;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'gCalendar' });
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.post('/add', function(req, res, next) {
  var body = req.body;
  new CalEvent({
    title: body['event-name'],
    start: body['event-date']+'T'+body['event-start'],
    end: body['event-date']+'T'+body['event-end'],
    description: body['event-desc'],
    url: body['event-url']
  }).save(function(err, newEvent){
    console.log(newEvent);
    res.redirect('/');
  });
});

module.exports = router;
