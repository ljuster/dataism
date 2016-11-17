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
    render 'interview_prep/index'
  end

  def temp
    render 'interview_prep/temp'
  end

  def about
    render 'welcome/about'
  end

end
