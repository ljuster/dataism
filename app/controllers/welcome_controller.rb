class WelcomeController < ApplicationController

  def index

  end
  # GET /welcome
  def gallery
    render '/shared/gallery'

  end

  def dataviz
    render 'shared/dataviz'
  end

  def interview_prep
    @arr = (-200..200).to_a.sample(16)
    render 'interview_prep/index', locals: {arr: @arr}
  end

  def temp
    render 'interview_prep/temp'
  end

  def about
    render 'welcome/about'
  end

end
