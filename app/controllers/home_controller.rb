class HomeController < ApplicationController
  include Rover
  
  def index
    if params[:commands]
      @commands = params[:commands].delete("\r").split(/\n/).collect! do |command|
        command.upcase.split(/ /)
      end
      grid = @commands[0].collect(&:to_i)
      @rover_one = move(grid,Array.new(@commands[1]),@commands[2]) if @commands[1] and @commands[2]
      @rover_two = move(grid,Array.new(@commands[3]),@commands[4]) if @commands[3] and @commands[4]
    end
    
    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => [@rover_one,@rover_two] }
    end
  end

end
