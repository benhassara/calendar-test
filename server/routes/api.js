var express = require('express');
var router = express.Router();
var utility = require('../logic/utility');
var mongoose = require('mongoose');
var CalEvent = mongoose.model('CalEvent');

var response;

// GET - all breakout groups
router.get('/breakouts', function(req, res) {
  CalEvent.find(function(err, events) {
    console.log(events);
    res.json(events);
  });
});

// GET - single breakout
router.get('/breakout/:id', function(req, res) {
  var query = {'_id': req.params.id};
  CalEvent.findOne(query, function(err, calEvent) {
    console.log(calEvent);
    res.json(calEvent);
  });
});

// POST - add breakout event
router.post('/add', function(req, res) {
  var body = req.body;
  new CalEvent({
    title: body['event-name'],
    start: body['event-date']+'T'+body['event-start'],
    end: body['event-date']+'T'+body['event-end'],
    description: body['event-desc'],
    url: body['event-url'],
    attendees: []
  }).save(function(err, newEvent){
    console.log(newEvent);
    res.redirect('/');
  });
});

// PUT - modify an event
router.put('/breakout/:id', function(req, res) {
  var query = {'_id': req.params.id};
  var update = req.body.attendees;
  var options = {new: true};
  CalEvent.findOneAndUpdate(query, update, options, function(err, calEvent) {
    console.log(calEvent);
    res.json(calEvent);
  });
});

// DELETE - single breakout group
router.delete('/breakout/:id', function(req, res) {
  var query = {'_id': req.params.id};
  CalEvent.findOneAndRemove(query, function(err, calEvent) {
    console.log(calEvent);
    res.redirect('/');
  });
});


module.exports = router;
