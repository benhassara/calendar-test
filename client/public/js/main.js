// add scripts
$('#hermy').on('click', function() {
  $('body').css('background-image', 'url(../hermy.png)');
  $('body').css('color', randColor());
});

$('#gradient').on('click', function() {
  $('body').css('background-image', "");
  $('body').css('color', 'white');
  $('body').attr('id', 'grad-bground');
});

$(document).on('ready', function() {
  // var events = [];
  // $('body').css('background-image', 'url(../hermy.png)');
  $("<audio></audio>").attr({
      'src':'../jparktheme.mp3',
      'volume':0.4,
      'autoplay':'autoplay'
  }).appendTo("body");



  $("#calendar").fullCalendar({
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      defaultView: 'agendaWeek',
      editable: false,
      lazyFetching: true,
      minTime: '09:00:00',
      maxTime: '17:00:00',
      weekends: false,
      height: 'auto',
      events: '/api/v1/breakouts'
    });


  $('#add-event').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    $('#event-modal').modal('show');
    $('#event-modal').on('hide.bs.modal', function(event) {
      clearForm();
      $('#calendar').fullCalendar('refetchEvents');
    });
  });

  $('#add-event-form').on('submit', function(event) {
    event.preventDefault();

    $.post('/api/v1/add', {
      title: $('#event-name').val(),
      start: $('#event-date').val()+'T'+$('#event-start').val(),
      end: $('#event-date').val()+'T'+$('#event-end').val(),
      description: $('#event-desc').val(),
      url: $('#event-url').val(),
    }, function(data){
      clearForm();
      $.get('api/v1/breakouts', function(eventsData) {
        console.log(eventsData);
        $('#calendar').fullCalendar('refetchEvents');
      });
      $('#event-modal').modal('hide');
    });
  });
});

function randColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$('#hermy').on('click', function() {
  $('body').css('background-image', 'url(../hermy.png)');
  $('body').css('color', randColor());
});

$('#gradient').on('click', function() {
  $('body').css('background-image', "");
  $('body').css('color', 'white');
  $('body').attr('id', 'grad-bground');
});


function clearForm() {
  $('#event-name').val('');
  $('#event-desc').val('');
  $('#event-date').val('');
  $('#event-start-time').val('');
  $('#event-end-time').val('');
  $('#event-url').val('');
}
