$(document).ready(function() {
  $('form').submit(function(){
    
    var commands = new Array();
    
    $.each($('textarea').val().split(/\n/),function(index,value){
      commands.push(value.toUpperCase().split(" "));
    });
    
    if (commands.length != 5) {
      alert('Master... I need 5 lines of input.');
      return false;
    }
    
    $('#right').html('<ul></ul>');
    $('#ruby').hide();
    
    var i = 0;
    var robot = '';
    var grid = commands[0];
    
    for (i=0;i<=grid[0];i++) {
      $('#right ul').append('<li></li>');
    }
    for (i=1;i<=grid[1];i++) {
      $('#right').append($('#right ul:first').clone());
    }
    
    $('#right ul').each(function(index,value){
      y = parseInt(grid[1],10) - index;
      $(this).children('li').each(function(index,value){
        $(this).html(index + '/' + y);
      });
    });
    
    robot = $('#rover_one').clone().show().appendTo($('ul:nth-child(' + (parseInt(grid[1],10) + 1 - parseInt(commands[1][1],10)) + ') li:nth-child('+(parseInt(commands[1][0],10)+1)+')')).fadeIn('slow').data('position',commands[1]);
    var wait = move(grid,commands[2],robot);
    
    robot = $('#rover_two').clone().show().appendTo($('ul:nth-child(' + (parseInt(grid[1],10) + 1 - parseInt(commands[3][1],10)) + ') li:nth-child('+(parseInt(commands[3][0],10)+1)+')')).fadeIn('slow').data('position',commands[3]);
    
    setTimeout(function(){
      wait = move(grid,commands[4],robot);
      
      // Superfluous test to show that ruby will return the same answer as javascript
      setTimeout(function(){
        $.getJSON("/",{commands: $('textarea').val()},function(data) {
          $.each([1,2,3],function(index,value){
            if (data[0][index] != $('#rover_one').data('position')[index] || data[1][index] != $('#rover_two').data('position')[index]) {
              console.log(data[0][index]);
              console.log(data[1][index]);
              alert('Does not compute! Javascript and Ruby did not give the same answer.');
              return false;
            }
          });
          $('#ruby').html('<p>Good Job! I also got <strong>'+data[0]+'</strong> and <strong>'+data[1]+'<strong></p>').fadeIn();
        });
      }, wait * 2000);
    },wait * 2000);
      
    return false;
  });
  
  function move(grid,commands,robot) {
    var moves = 0;
    $.each(commands,function(index,command){
      if (command == 'L' || command == 'R') turn(command,robot);
      if (command == 'M') {
        go_forward(grid,robot);
        moves++;
      }
    });
    
    var js = robot.data('position');
    var ruby = $('body').data('ruby');
    // console.log(ruby);
    // $.each([1,2,3],function(index,value){
    //   if (js[index] != ruby[0][index]) {
    //     console.log(js[index]);
    //     console.log(ruby[0][index]);
    //     alert('Does not compute! Javascript and Ruby did not give the same answer.');
    //     return false;
    //   }
    // });
    // $('body').data('ruby',ruby.shift());
    // if (ruby.length == 0) {
    //   $('#ruby').fadeIn();
    // }
    
    return moves;
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