module Rover
  def move(grid,start,commands)
    commands.each do |command|
      start[2] = turn(start[2],command) if command == 'L' or command == 'R'
      forward(grid,start) if command == 'M'
    end
    start
  end

  def turn(start,command)
    compass = Hash['N'=>['W','E'],'E'=>['N','S'],'S'=>['E','W'],'W'=>['S','N']]
    compass[start][command == 'L' ? 0 : 1]
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
    start
  end
end