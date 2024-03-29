function hoverCar(coord) {
  var ele = $('#' + coord);

  ele.append(
    $('<div/>', {class: 'car temporaryCar'})
  )
}

function placeCar(coord) {
  var ele = $('#' + coord);

  ele.find('.temporaryCar').remove();
  ele.append(
    $('<div/>', {class: 'car'})
  )
}

function removeRoad(coord) {
  var ele = $('#' + coord);

  if ($(ele).hasClass('road')) {
    ele.removeClass('road');
    ele.empty();

    var coords = coord.split('-');
    
    var x = parseInt(coords[0]), y = parseInt(coords[1]);

    var sides = [`#${x-1}-${y}`, `#${x+1}-${y}`, `#${x}-${y-1}`, `#${x}-${y+1}`];

    for (var i = 0; i < sides.length; i++) {
      if ($(sides[i]).hasClass('road')) {
        checkSides(sides[i].substr(1));
      }
    }
  }
}

function checkCorners(corners) {
  var cornerCovered = true;
  for (var i = 0; i < corners.length; i++) {
    if (!($(corners[i]).hasClass('road'))) {
      cornerCovered = false;
    }
  }

  if (cornerCovered) {
    return true;
  } else {
    return false;
  }
}

function checkSides(coord) {
  var ele = $('#' + coord);
  var coords = coord.split('-');
  
  var x = parseInt(coords[0]), y = parseInt(coords[1]);
  
  var topLeftCorner = [`#${x-1}-${y}`, `#${x-1}-${y-1}`, `#${x}-${y-1}`];
  if (checkCorners(topLeftCorner)) {
    return;
  }

  var topRightCorner = [`#${x+1}-${y}`, `#${x+1}-${y-1}`, `#${x}-${y-1}`];
  if (checkCorners(topRightCorner)) {
    return;
  }

  var bottomRightCorner = [`#${x+1}-${y}`, `#${x+1}-${y+1}`, `#${x}-${y+1}`];
  if (checkCorners(bottomRightCorner)) {
    return;
  }

  var bottomLeftCorner = [`#${x-1}-${y}`, `#${x-1}-${y+1}`, `#${x}-${y+1}`];
  if (checkCorners(bottomLeftCorner)) {
    return;
  }


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

        if (cellAboveAbove.hasClass('road')) {
          cellAbove.append(
            $('<div/>', {class: 'paint intersection horizontalRightSide'})
          ).append(
            $('<div/>', {class: 'paint vertical'})
          )
        } else {
          cellAbove.append(
            $('<div/>', {class: 'paint intersection horizontalRightSide'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalBottomSide'})
          )
        }
        
      } else if (cellAboveLeft.hasClass('road')) {
        cellAbove.empty();

        if (cellAboveAbove.hasClass('road')) {
          cellAbove.append(
            $('<div/>', {class: 'paint intersection horizontalLeftSide'})
          ).append(
            $('<div/>', {class: 'paint vertical'})
          )
        } else {
          cellAbove.append(
            $('<div/>', {class: 'paint intersection horizontalLeftSide'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalBottomSide'})
          )
        }
        
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
        if (cellBelowBelow.hasClass('road')) {
          cellBelow.append(
            $('<div/>', {class: 'paint intersection horizontalRightSide'})
          ).append(
            $('<div/>', {class: 'paint vertical'})
          )
        } else {
          cellBelow.append(
            $('<div/>', {class: 'paint intersection horizontalRightSide'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalTopSide'})
          )
        }
      } else if (cellBelowLeft.hasClass('road')) {
        cellBelow.empty();
        if (cellBelowBelow.hasClass('road')) {
          cellBelow.append(
            $('<div/>', {class: 'paint intersection horizontalLeftSide'})
          ).append(
            $('<div/>', {class: 'paint vertical'})
          )
        } else {
          cellBelow.append(
            $('<div/>', {class: 'paint intersection horizontalLeftSide'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalTopSide'})
          )
        }
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

        if (cellRightRight.hasClass('road')) {
          cellRight.append(
            $('<div/>', {class: 'paint horizontal'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalTopSide'})
          )
        } else {
          cellRight.append(
            $('<div/>', {class: 'paint intersection horizontalLeftSide'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalTopSide'})
          )
        }
      } else if (cellRightBelow.hasClass('road')) {
        cellRight.empty();

        if (cellRightRight.hasClass('road')) {
          cellRight.append(
            $('<div/>', {class: 'paint horizontal'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalBottomSide'})
          )
        } else {
          cellRight.append(
            $('<div/>', {class: 'paint intersection horizontalLeftSide'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalBottomSide'})
          )
        }
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

        if (cellLeftLeft.hasClass('road')) {
          cellLeft.append(
            $('<div/>', {class: 'paint horizontal'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalTopSide'})
          )
        } else {
          cellLeft.append(
            $('<div/>', {class: 'paint intersection horizontalRightSide'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalTopSide'})
          )
        }
      } else if (cellLeftBelow.hasClass('road')) {
        cellLeft.empty();

        if (cellLeftLeft.hasClass('road')) {
          cellLeft.append(
            $('<div/>', {class: 'paint horizontal'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalBottomSide'})
          )
        } else {
          cellLeft.append(
            $('<div/>', {class: 'paint intersection horizontalRightSide'})
          ).append(
            $('<div/>', {class: 'paint intersection verticalBottomSide'})
          )
        }
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
  var selectedTool = '';

  var width = $(document).width();
  var height = $(document).height() - 100;

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
  
  $('.toolbar').css('width', `${horizontalCells * 50}px`)
  $('.grid').css('width', `${horizontalCells * 50}px`)
  $('.grid').css('height', `${verticalCells * 50}px`)
  $('.grid').css('grid-template-columns', columns);
  $('.grid').css('grid-template-rows', rows);

  $('.cell').on('mouseover', function() {
    if ($(this).children().length == 0) {
      if (selectedTool == 'road') {
        $(this).append(
          $('<div/>', {class: 'temporary'}).append(
            $('<div/>', {class: 'paint'})
          )
        )
      } else if (selectedTool == 'house') {
        $(this).append(
          $('<div/>', {class: 'house temporaryHouse'})
        )
      }
    } else {
      if (selectedTool == 'car') {
        if ($(this).hasClass('road')) {
          if ($(this).find('.car').length == 0) {
            hoverCar($(this).attr('id'));
          }
        }
      }
    }
  });

  $('.cell').on('mouseleave', function() {
    $(this).find('.temporary').remove();
    $(this).find('.temporaryCar').remove();
    $(this).find('.temporaryHouse').remove();
  });

  $('.cell').on('mousedown', function(e) {
    if (selectedTool == 'road') {
      switch (e.which) {
        case 1:
          checkSides($(this).attr('id'));
          break;
        case 3:
          removeRoad($(this).attr('id'));
          break;
      }
    } else if (selectedTool == 'car') {
      if ($(this).hasClass('road')) {
        switch (e.which) {
          case 1:
            placeCar($(this).attr('id'));
            break;
          case 3:
            removeCar($(this).attr('id'));
            break;
        }
      }
    }
  });

  $('body').on('contextmenu', function() {
    return false;
  });

  $('.tool').on('click', function() {
    if ($(this).hasClass('selected')) {
      selectedTool = '';
      $(this).removeClass('selected');
    } else {
      if ($(this).hasClass('roadTool')) {
        selectedTool = 'road';
      } else if ($(this).hasClass('carTool')) {
        selectedTool = 'car';
      } else if ($(this).hasClass('houseTool')) {
        selectedTool = 'house';
      }

      var pressedTool = this;
      $('.tool').each(function() {
        if (!(this == pressedTool)) {
          $(this).removeClass('selected');
        }
      });
      
      $(this).addClass('selected');
    }
  });
});