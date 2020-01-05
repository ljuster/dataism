
class WelcomeController < ApplicationController

  def index
    @event = Event.first
  end
  # GET /welcome
  def gallery
    render '/shared/gallery'
  end

  def win_loss_viz
    path2 = "#{Rails.root}/lib/assets/ucsb.csv"
    @df2 = DataFile.new ({path: path2, type: "team", corr: true})
    render 'shared/wl'
  end

  def dataviz
    if params[:conference]=='BW'
      path = "#{Rails.root}/lib/assets/big_west_wbb_2016.csv"
    else
      path = "#{Rails.root}/lib/assets/wac.csv"
      @hide = true
    end
    @df = DataFile.new ({path: path, type: "conference", corr: false})
    render 'shared/dataviz'
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
