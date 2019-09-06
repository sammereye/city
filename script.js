$(function() {
  var cellSize = 40;
  var columns = '';
  
  for (var i = 0; i < cellSize; i++) {
    columns += '1fr '
  }  

  for (var i = 1; i <= cellSize; i++) {
    for (var j = 1; j <= cellSize; j++) {
      $('.grid').append(
        $('<div/>', {class: `cell`, id: `${i}-${j}`})
      );
    }
  }
  
  $('.grid').css('grid-template-columns', columns);

  $('.cell').on('mouseover', function() {
    if ($(this).children().length == 0) {
      $(this).append(
        $('<div/>', {class: 'temporary'})
      )
    }
  });

  $('.cell').on('mouseleave', function() {
    $(this).empty();
  });
});