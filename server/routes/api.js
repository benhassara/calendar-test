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
    title: body.title,
    start: body.start,
    end: body.end,
    description: body.description,
    url: body.url,
    attendees: 0
  }).save(function(err, newEvent){
    res.json({
      message: 'Event added.',
      calEvent: newEvent
    });
  });
});

// PUT - modify an event
router.put('/breakout/:id', function(req, res) {
  var query = {'_id': req.params.id};
  var newAttendees = 0;

  CalEvent.findOne(query, function(err, calEvent) {
    newAttendees = calEvent.attendees + 1;
    var update = {attendees: newAttendees};
    var options = {new: true};
    CalEvent.findOneAndUpdate(query, update, options, function(err, calEvent) {
      res.json(calEvent);
    });
  });

  // var update = {attendees: newAttendees};
  // var options = {new: true};
  // CalEvent.findOneAndUpdate(query, update, options, function(err, calEvent) {
  //   console.log('findOneAndUpdate: ' + calEvent);
  //   res.json(calEvent);
  // });
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
