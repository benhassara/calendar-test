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

// handler for when Attend btn in tooltip is clicked
$(document).on('click', ".attend", function() {
  console.log($(this).parent());
  $.ajax({
    type: 'PUT',
    url: '/api/v1/breakout/' + $(this).attr('id')
  }).done(function(data) {
    console.log(data);
  });
  var $span = $(this).parent().find('.att-num');
  var num = Number($span.html()) + 1;

  $span.html(num);


});

$(document).on('ready', function() {

  $("<audio></audio>").attr({
      'src':'../jparktheme.mp3',
      'volume':0.4,
      'autoplay':'autoplay'
  }).appendTo("body");

  var tooltip = $('<div/>').qtip({
          id: 'fullcalendar',
          prerender: true,
          content: {
              text: ' ',
              title: {
                  button: true
              }
          },
          position: {
              my: 'bottom center',
              at: 'top center',
              target: 'mouse',
              viewport: $(window),
              adjust: {
                  mouse: false,
                  scroll: false
              }
          },
          show: false,
          hide: false,
          style: 'qtip-light'
      }).qtip('api');

  $("#calendar").fullCalendar({
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      eventClick: function(data, event, view) {
        var content = '<h3>'+data.title+'</h3>' +
                      '<p><b>Start:</b> '+data.start.format('h:mma')+'<br />' +
                      (data.description && '<p><b>Description: </b>'+data.description || '')+
                      (data.end && '<p><b>End:</b> '+data.end.format('h:mma')+'</p>' || '')+
                      (data.attendees && '<p><b>Attending:  </b><span class="att-num">'+data.attendees + '</span></p>' || '')+
                      '<button class="attend" id="'+data._id+'">Attend!</button>';

        tooltip.set({'content.text': content})
               .reposition(event).show(event);
      },
      dayClick: function() { tooltip.hide(); },
      eventResizeStart: function() { tooltip.hide(); },
      eventDragStart: function() { tooltip.hide(); },
      viewDisplay: function() { tooltip.hide(); },
      defaultView: 'agendaWeek',
      editable: false,
      lazyFetching: true,
      minTime: '09:00:00',
      maxTime: '17:00:00',
      weekends: false,
      height: 'auto',
      events: '/api/v1/breakouts'
    });

  // handler for Add Event btn that launches add event form modal
  $('#add-event').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    $('#event-modal').modal('show');
    $('#event-modal').on('hide.bs.modal', function(event) {
      clearForm();
      $('#calendar').fullCalendar('refetchEvents');
    });
  });

  // handler for Add Event form submission
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
