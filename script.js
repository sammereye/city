function checkSides(coord) {
  var ele = $('#' + coord);
  var coords = coord.split('-');
  
  var x = parseInt(coords[0]), y = parseInt(coords[1]);

  var neighbors = 0;

  var roadsAround = {
    'above': false,
    'below': false,
    'right': false,
    'left': false
  }

  var cellAbove = $(`#${x}-${y-1}`);
  if (cellAbove.hasClass('road')) {
    roadsAround['above'] = true;
    if (!(cellAbove.find('.paint').hasClass('vertical'))) {
      var cellAboveRight = $(`#${x+1}-${y-1}`);
      var cellAboveLeft = $(`#${x-1}-${y-1}`);
      var cellAboveAbove = $(`#${x}-${y-2}`);

      if (cellAboveRight.hasClass('road') && cellAboveLeft.hasClass('road') && cellAboveAbove.hasClass('road')) {
        cellAbove.empty();
        cellAbove.append(
          $('<div/>', {class: 'paint cross'})
        )
      } else if (cellAboveRight.hasClass('road') && cellAboveLeft.hasClass('road')) {
        cellAbove.empty();
        cellAbove.append(
          $('<div/>', {class: 'paint horizontal'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalBottomSide'})
        )
      } else if (cellAboveRight.hasClass('road')) {
        cellAbove.empty();
        cellAbove.append(
          $('<div/>', {class: 'paint intersection horizontalRightSide'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalBottomSide'})
        )
      } else if (cellAboveLeft.hasClass('road')) {
        cellAbove.empty();
        cellAbove.append(
          $('<div/>', {class: 'paint intersection horizontalLeftSide'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalBottomSide'})
        )
      } else {
        cellAbove.find('.paint').addClass('vertical')
      }
    }
  }

  var cellBelow = $(`#${x}-${y+1}`);
  if (cellBelow.hasClass('road')) {
    roadsAround['below'] = true;
    if (!(cellBelow.find('.paint').hasClass('vertical'))) {
      var cellBelowRight = $(`#${x+1}-${y+1}`);
      var cellBelowLeft = $(`#${x-1}-${y+1}`);
      var cellBelowBelow = $(`#${x}-${y+2}`);

      if (cellBelowRight.hasClass('road') && cellBelowLeft.hasClass('road') && cellBelowBelow.hasClass('road')) {
        cellBelow.empty();
        cellBelow.append(
          $('<div/>', {class: 'paint cross'})
        )
      } else if (cellBelowRight.hasClass('road') && cellBelowLeft.hasClass('road')) {
        cellBelow.empty();
        cellBelow.append(
          $('<div/>', {class: 'paint horizontal'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalTopSide'})
        )
      } else if (cellBelowRight.hasClass('road')) {
        cellBelow.empty();
        cellBelow.append(
          $('<div/>', {class: 'paint intersection horizontalRightSide'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalTopSide'})
        )
      } else if (cellBelowLeft.hasClass('road')) {
        cellBelow.empty();
        cellBelow.append(
          $('<div/>', {class: 'paint intersection horizontalLeftSide'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalTopSide'})
        )
      } else {
        cellBelow.find('.paint').addClass('vertical')
      }
    }
  }



  var cellRight = $(`#${x+1}-${y}`);
  if (cellRight.hasClass('road')) {
    roadsAround['right'] = true;
    if (!(cellRight.find('.paint').hasClass('horizontal'))) {
      var cellRightAbove = $(`#${x+1}-${y-1}`);
      var cellRightBelow = $(`#${x+1}-${y+1}`);
      var cellRightRight = $(`#${x+2}-${y}`);

      if (cellRightAbove.hasClass('road') && cellRightBelow.hasClass('road') && cellRightRight.hasClass('road')) {
        cellRight.empty();
        cellRight.append(
          $('<div/>', {class: 'paint cross'})
        )
      } else if (cellRightAbove.hasClass('road') && cellRightBelow.hasClass('road')) {
        cellRight.empty();
        cellRight.append(
          $('<div/>', {class: 'paint vertical'})
        ).append(
          $('<div/>', {class: 'paint intersection horizontalLeftSide'})
        )
      } else if (cellRightAbove.hasClass('road')) {
        cellRight.empty();
        cellRight.append(
          $('<div/>', {class: 'paint intersection horizontalLeftSide'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalTopSide'})
        )
      } else if (cellRightBelow.hasClass('road')) {
        cellRight.empty();
        cellRight.append(
          $('<div/>', {class: 'paint intersection horizontalLeftSide'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalBottomSide'})
        )
      }
    }
  }


  var cellLeft = $(`#${x-1}-${y}`);
  if (cellLeft.hasClass('road')) {
    roadsAround['left'] = true;
    if (!(cellLeft.find('.paint').hasClass('horizontal'))) {
      var cellLeftAbove = $(`#${x-1}-${y-1}`);
      var cellLeftBelow = $(`#${x-1}-${y+1}`);
      var cellLeftLeft = $(`#${x-2}-${y}`);

      if (cellLeftAbove.hasClass('road') && cellLeftBelow.hasClass('road') && cellLeftLeft.hasClass('road')) {
        cellLeft.empty();
        cellLeft.append(
          $('<div/>', {class: 'paint cross'})
        )
      } else if (cellLeftAbove.hasClass('road') && cellLeftBelow.hasClass('road')) {
        cellLeft.empty();
        cellLeft.append(
          $('<div/>', {class: 'paint vertical'})
        ).append(
          $('<div/>', {class: 'paint intersection horizontalRightSide'})
        )
      } else if (cellLeftAbove.hasClass('road')) {
        cellLeft.empty();
        cellLeft.append(
          $('<div/>', {class: 'paint intersection horizontalRightSide'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalTopSide'})
        )
      } else if (cellLeftBelow.hasClass('road')) {
        cellLeft.empty();
        cellLeft.append(
          $('<div/>', {class: 'paint intersection horizontalRightSide'})
        ).append(
          $('<div/>', {class: 'paint intersection verticalBottomSide'})
        )
      }
    }
  }


  ele.addClass('road');
  ele.empty();

  if (roadsAround['above'] && roadsAround['below'] && roadsAround['right'] && roadsAround['left']) {
    ele.append(
      $('<div/>', {class: 'paint cross'})
    )
  } else if (roadsAround['below'] && roadsAround['left'] && roadsAround['right']) {
    ele.append(
      $('<div/>', {class: 'paint horizontal'})
    ).append(
      $('<div/>', {class: 'paint intersection verticalBottomSide'})
    )
  } else if (roadsAround['below'] && roadsAround['left'] && roadsAround['above']) {
    ele.append(
      $('<div/>', {class: 'paint vertical'})
    ).append(
      $('<div/>', {class: 'paint intersection horizontalLeftSide'})
    )
  } else if (roadsAround['below'] && roadsAround['right'] && roadsAround['above']) {
    ele.append(
      $('<div/>', {class: 'paint vertical'})
    ).append(
      $('<div/>', {class: 'paint intersection horizontalRightSide'})
    )
  } else if (roadsAround['left'] && roadsAround['right'] && roadsAround['above']) {
    ele.append(
      $('<div/>', {class: 'paint horizontal'})
    ).append(
      $('<div/>', {class: 'paint intersection verticalTopSide'})
    )
  } else if (roadsAround['left'] && roadsAround['above']) {
    ele.append(
      $('<div/>', {class: 'paint intersection horizontalLeftSide'})
    ).append(
      $('<div/>', {class: 'paint intersection verticalTopSide'})
    )
  } else if (roadsAround['right'] && roadsAround['above']) {
    ele.append(
      $('<div/>', {class: 'paint intersection horizontalRightSide'})
    ).append(
      $('<div/>', {class: 'paint intersection verticalTopSide'})
    )
  } else if (roadsAround['right'] && roadsAround['below']) {
    ele.append(
      $('<div/>', {class: 'paint intersection horizontalRightSide'})
    ).append(
      $('<div/>', {class: 'paint intersection verticalBottomSide'})
    )
  } else if (roadsAround['left'] && roadsAround['below']) {
    ele.append(
      $('<div/>', {class: 'paint intersection horizontalLeftSide'})
    ).append(
      $('<div/>', {class: 'paint intersection verticalBottomSide'})
    )
  } else if (roadsAround['above'] || roadsAround['below']) {
    ele.append(
      $('<div/>', {class: 'paint vertical'})
    )
  } else {
    ele.append(
      $('<div/>', {class: 'paint'})
    )
  }
}








$(function() {
  var columns = '';
  var rows = '';

  var width = $(document).width();
  var height = $(document).height();

  var horizontalCells = Math.floor(width / 50);
  var verticalCells = Math.floor(height / 50);

  
  for (var i = 0; i < horizontalCells; i++) {
    columns += '1fr '
  }

  for (var i = 0; i < verticalCells; i++) {
    rows += '1fr '
  }  

  for (var i = 1; i <= verticalCells; i++) {
    for (var j = 1; j <= horizontalCells; j++) {
      $('.grid').append(
        $('<div/>', {class: `cell`, id: `${j}-${i}`})
      );
    }
  }
  
  $('.grid').css('width', `${horizontalCells * 50}px`)
  $('.grid').css('height', `${verticalCells * 50}px`)
  $('.grid').css('grid-template-columns', columns);
  $('.grid').css('grid-template-rows', rows);

  $('.cell').on('mouseover', function() {
    if ($(this).children().length == 0) {
      $(this).append(
        $('<div/>', {class: 'temporary'}).append(
          $('<div/>', {class: 'paint'})
        )
      )
    }
  });

  $('.cell').on('mouseleave', function() {
    $(this).find('.temporary').remove();
  });

  $('.cell').on('mousedown', function() {
    
    checkSides($(this).attr('id'));


    // if ($(this).css('backgroundColor') != 'rgb(37, 37, 37)') {
    //   $(this).addClass('road');
    //   $(this).find('.temporary').remove();
    //   $(this).append(
    //     $('<div/>', {class: 'paint'})
    //   )
    // }
  });
});