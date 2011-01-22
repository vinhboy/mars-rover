class HomeController < ApplicationController
  def index
    if params[:commands]
      @commands = params[:commands].delete!("\r").split(/\n/).collect! do |command|
        command.split(/ /)
      end
      grid = @commands[0].collect(&:to_i)
      @rover_one = move(grid,@commands[1],@commands[2])
      @rover_two = move(grid,@commands[3],@commands[4])
    end
  end
  
  def move(grid,start,directions)
    directions.each do |direction|
      start[2] = turn(start,direction) if direction == 'L' or direction == 'R'
      
      if direction == 'M'
        if start[2] == 'N' or start[2] == 'S'
          dir = start[2] == 'N' ? 1 : -1
          if (start[1].to_i + dir) <= grid[1]
            start[1] = start[1].to_i + dir
          end
        end
        if start[2] == 'E' or start[2] == 'W'
          dir = start[2] == 'E' ? 1 : -1
          if (start[0].to_i + dir) <= grid[0]
            start[0] = start[0].to_i + dir
          end
        end
      end
    end
    start
  end
  
  def turn(start,direction)
    compass = Hash['N'=>['W','E'],'E'=>['N','S'],'S'=>['E','W'],'W'=>['S','N']]
    compass[start[2]][direction == 'L' ? 0 : 1]
    # if (oldpos = compass.index(start[2]))
    #   dir = direction == 'R' ? 1 : -1
    #   oldpos = -1 if (oldpos > 2)
    #   compass[oldpos + dir]
    # end
  end
end
