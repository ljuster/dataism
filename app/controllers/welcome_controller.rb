
class WelcomeController < ApplicationController

  def index

  end
  # GET /welcome
  def gallery
    render '/shared/gallery'

  end

  def dataviz
    @r_ex = Rserve::Simpler.new(cmd_init: 'R CMD Rserve --no-save', hostname: 'localhost')
    @r_ex = @r_ex.converse "mean(c(1,2,3))"  # -> 2.0
    render 'shared/dataviz', locals: {r: @r_ex}
  end

  def github_feed
    render 'shared/github_feed'
  end

  def interview_prep
    if params[:locals].nil?
      @arr = {"vals" => (-200..200).to_a.sample(16)} if params[:locals].nil?
    else
      @arr = params[:locals][:arr]
    end
    @algorithm = Algorithm.new(:input => 0)
    render 'interview_prep/index', locals: {arr: @arr, algorithm: @algorithm}
  end

  def temp
    render 'interview_prep/temp'
  end

  def about
    render 'welcome/about'
  end

end
