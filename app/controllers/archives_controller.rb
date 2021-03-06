require 'open-uri'
require 'zlib'

class ArchivesController < ApplicationController
  before_action :set_archive, only: [:show, :edit, :update, :destroy]

  # GET /archives
  # GET /archives.json
  def index
    @archives = Archive.all
    after = "2012-11-01T13:00:00Z"
    before= "2012-11-02T03:12:14-03:00"
    time_span = get_time_span(after,before)
    gz = open('http://data.githubarchive.org/2015-01-01-0.json.gz')
    # gz = open("http://data.githubarchive.org/#{time_span}.json.gz")
    js = Zlib::GzipReader.new(gz).read
    # #
    Yajl::Parser.parse(js) do |event|
      if event["type"] == "PushEvent"
        archive_params = {:user_id => event["actor"]["id"], :name => event["actor"]["login"]}
        @archive = Archive.new(archive_params)
        @archive.save
      end
    end
    # Aggregate and get top

    @archives = Archive.group('name').limit(42).order('count_user_id desc').count(:user_id)
  end

  # GET /archives/1
  # GET /archives/1.json
  def show

  end

  # GET /archives/new
  def new
    @archive = Archive.new
  end

  # GET /archives/1/edit
  def edit
  end

  # POST /archives
  # POST /archives.json
  def create
    @archive = Archive.new(archive_params)

    respond_to do |format|
      if @archive.save
        format.html { redirect_to @archive, notice: 'Archive was successfully created.' }
        format.json { render :show, status: :created, location: @archive }
      else
        format.html { render :new }
        format.json { render json: @archive.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /archives/1
  # PATCH/PUT /archives/1.json
  def update
    respond_to do |format|
      if @archive.update(archive_params)
        format.html { redirect_to @archive, notice: 'Archive was successfully updated.' }
        format.json { render :show, status: :ok, location: @archive }
      else
        format.html { render :edit }
        format.json { render json: @archive.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /archives/1
  # DELETE /archives/1.json
  def destroy
    @archive.destroy
    respond_to do |format|
      format.html { redirect_to archives_url, notice: 'Archive was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_time_span(after,before)
    a = after.split('-')
    a_yr = a[0]
    a_mo = a[1]
    a_day = a[2].split(':')[0].split('T')[0]
    b = before.split('-')
    b_day = b[2].split(':')[0].split('T')[0]
    b_hr = b[2].split(':')[0].split('T')[1]
    c= "#{a_yr}-#{a_mo}-{#{a_day}..#{b_day}}-{0..#{b_hr}}"
    c
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_archive
      @archive = Archive.find(params[:id])
    end


  
end
