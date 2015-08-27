
function postHandler(body) {
  var newEvent = new CalEvent(
                        body['event-name'],
                        body['event-desc'],
                        body['event-date'],
                        body['event-start'],
                        body['event-end'],
                        body['event-url'] );

  return {message: "Event added.", calEvent: newEvent};
}

function CalEvent(name, desc, date, start, end, url) {
  this.name = name;
  this.desc = desc;
  this.date = date;
  this.start = start;
  this.end = end;
  this.url = url || 'https://www.google.com';
}

CalEvent.prototype.calFormat = function() {
  // this will do things
  var out = {
    title: this.name,
    start: this.start,
    end: this.end,
    url: this.url,
    overlap: true
  };
};

module.exports = postHandler;
