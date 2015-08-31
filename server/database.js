var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CalEvent = new Schema(
  {
    title: String,
    date: String,
    start: String,
    end: String,
    description: String,
    url: String,
    attendees: Array
  }
);

mongoose.model('CalEvent', CalEvent);
mongoose.connect('mongodb://localhost/cal-events');
