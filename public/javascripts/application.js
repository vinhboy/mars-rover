$(document).ready(function() {
  $('form').submit(function(){
    var commands = new Array();
    $.each($('textarea').val().split(/\n/),function(index,value){
      commands.push(value.toUpperCase().split(" "));
    });
    $('#right').html('<ul></ul>');
    var i = 0;
    for (i=0;i<=commands[0][0];i++) {
      $('#right ul').append('<li></li>');
    }
    for (i=1;i<=commands[0][1];i++) {
      $('#right').append($('#right ul:first').clone());
    }
    var robot = '';
    var grid = commands[0];
    if (commands[1] && commands[2]) {
      robot = $('#rover_one').clone().show().appendTo($('ul:nth-child(' + (parseInt(grid[1],10) + 1 - parseInt(commands[1][1],10)) + ') li:nth-child('+(parseInt(commands[1][0],10)+1)+')')).fadeIn('slow').data('position',commands[1]);
      move(grid,commands[2],robot);
    }
    if (commands[3] && commands[4]) {
      robot = $('#rover_two').clone().show().appendTo($('ul:nth-child(' + (parseInt(grid[1],10) + 1 - parseInt(commands[3][1],10)) + ') li:nth-child('+(parseInt(commands[3][0],10)+1)+')')).fadeIn('slow').data('position',commands[3]);
      move(grid,commands[4],robot);
    }
    return false;
  });
  
  function move(grid,commands,robot) {
    $.each(commands,function(index,command){
      if (command == 'L' || command == 'R') turn(command,robot);
      if (command == 'M') go_forward(grid,robot);
    });
    console.log(robot);
    console.log(robot.data('position'));
  }
  
  function turn(dir,robot) {
    compass = {'N':['W','E'],'E':['N','S'],'S':['E','W'],'W':['S','N']};
    var position = robot.data('position');
    position[2] = compass[position[2]][dir == 'L' ? 0 : 1];
    robot.data('position',position);
  }
  
  function go_forward(grid,robot) {
    var position = robot.data('position');
    if (position[2] == 'N' || position[2] == 'S') {
      var y = parseInt(position[1],10) + (position[2] == 'N' ? 1 : -1);
      if (y >= 0 && y <= grid[1]) {
        position[2] == 'N' ? robot.animate({top: '-=91'}, 2000) : robot.animate({top: '+=91'}, 2000);
        position[1] = y;
      }
    }
    if (position[2] == 'E' || position[2] == 'W') {
      var x = parseInt(position[0],10) + (position[2] == 'E' ? 1 : -1);
      if (x >= 0 && x <= grid[0]) {
        position[2] == 'E' ? robot.animate({left: '+=98'}, 2000) : robot.animate({left: '-=98'}, 2000);
        position[0] = x;
      }
    }
    robot.data('position',position);
  }
});