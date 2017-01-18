
class WelcomeController < ApplicationController

  def index

  end
  # GET /welcome
  def gallery
    render '/shared/gallery'

  end

  def dataviz
    @df = Daru::DataFrame.from_csv("#{Rails.root}/lib/assets/big_west_wbb_2016.csv")
    @df = @df.sort(['fg_pct'])
    @x = @df['fg_pct']
    @y = @df['overall']
    @labels = @df['team_name']
    @stat_names = @df.data.reject{ |e| e.name == "team_name" || e.name == "overall"}.collect{|e| e.name}
    @reg = Statsample::Regression.simple(@x, @y)
    @cm = Statsample::Bivariate.correlation_matrix(@df)
    render 'shared/dataviz', locals: {df: @df, x: @x, y: @y, labels: @labels, stat_names: @stat_names}
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
