
class WelcomeController < ApplicationController

  def index

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

  def result2
    # result
    @selected_city = nil
    @selected_state = nil
    @selected_date = nil

    if params[:xcity_id].present?
      # @selected_city = CitiesExtended.find_by_id(params[:xcity_id])
      cookies[:selected_city] = params[:xcity_id]
    elsif params[:state].present?
      # @selected_state = State.find_by_code(params[:state])
    elsif cookies[:selected_city].present?
      # @selected_city = CitiesExtended.find_by_id(params[:selected_city])
    end

    if params[:date].present?
      @selected_date = params[:date]
    elsif cookies[:selected_date].present?
      @selected_date = cookies[:selected_date]
    end

    render layout: 'react_application'
  end

end
