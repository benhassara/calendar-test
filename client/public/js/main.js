// add scripts

$(document).on('ready', function() {
  var events = [];

  $("#calendar").fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek'
      },
      defaultView: 'agendaWeek',
      defaultDate: '2014-06-12',
      editable: true,
      lazyFetching: true,
      minTime: '09:00:00',
      maxTime: '17:00:00',
      weekends: false,
      height: 'auto',
      events: events
    });


  $('#add-event').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    $('#event-modal').modal('show');
    $('#event-modal').on('hide.bs.modal', function(event) {
      clearForm();
      $('#calendar').fullCalendar({
        events: [ // put the array in the `events` property
                {
                    title  : 'event1',
                    start  : '2010-01-01'
                },
                {
                    title  : 'event2',
                    start  : '2010-01-05',
                    end    : '2010-01-07'
                },
                {
                    title  : 'event3',
                    start  : '2010-01-09T12:30:00',
                }
            ]
      });
    });
  });
});


function clearForm() {
  $('#event-name').val('');
  $('#event-desc').val('');
  $('#event-date').val('');
  $('#event-start-time').val('');
  $('#event-end-time').val('');
  $('#event-url').val('');
}
