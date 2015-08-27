// add scripts

$(document).on('ready', function() {
  // var events = [];
  $('body').css('background-image', 'url(hermy.png)');

  $("#calendar").fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek'
      },
      defaultView: 'agendaWeek',
      defaultDate: '2015-08-27',
      editable: false,
      lazyFetching: true,
      minTime: '09:00:00',
      maxTime: '17:00:00',
      weekends: false,
      height: 'auto'
    });


  $('#add-event').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    $('#event-modal').modal('show');
    $('#event-modal').on('hide.bs.modal', function(event) {
      clearForm();
      $('#calendar').fullCalendar('renderEvent', {
        title: 'after modal',
        start: '2015-08-27T13:00:00'
      }, true);
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
