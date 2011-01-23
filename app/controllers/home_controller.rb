class HomeController < ApplicationController
  def index
    if params[:commands]
      @commands = params[:commands].delete!("\r").split(/\n/).collect! do |command|
        command.upcase.split(/ /)
      end
      grid = @commands[0].collect(&:to_i)
      @rover_one = move(grid,Array.new(@commands[1]),@commands[2]) if @commands[1] and @commands[2]
      @rover_two = move(grid,Array.new(@commands[3]),@commands[4]) if @commands[3] and @commands[4]
    end
  end
  
  def move(grid,start,commands)
    commands.each do |command|
      turn(start,command) if command == 'L' or command == 'R'
      forward(grid,start) if command == 'M'
    end
    start
  end
  
  def turn(start,command)
    compass = Hash['N'=>['W','E'],'E'=>['N','S'],'S'=>['E','W'],'W'=>['S','N']]
    start[2] = compass[start[2]][command == 'L' ? 0 : 1]
  end
  
  def forward(grid,start)
    if start[2] == 'N' or start[2] == 'S'
      dir = start[2] == 'N' ? 1 : -1
      if (0..grid[1]) === (start[1].to_i + dir)
        start[1] = start[1].to_i + dir
      end
    end
    if start[2] == 'E' or start[2] == 'W'
      dir = start[2] == 'E' ? 1 : -1
      if (0..grid[0]) === (start[0].to_i + dir)
        start[0] = start[0].to_i + dir
      end
    end
  end
end
