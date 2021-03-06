class AlgorithmsController < ApplicationController
  before_action :set_algorithm, only: [:show, :edit, :update, :destroy]

  # GET /algorithms
  # GET /algorithms.json
  def index
    @algorithms = Algorithm.all
  end

  # GET /algorithms/1
  # GET /algorithms/1.json
  def show
    if(params[:algorithm]=="fibonacci")
      @output = @algorithm[:output]
      redirect_to controller: 'welcome', action: 'interview_prep', locals: {output: @output}
    end
  end

  # GET /algorithms/new
  def new
    @algorithm = Algorithm.new(name: params[:algorithm])
    if(params[:algorithm]=="quickSort")
      @arr = {"vals" => params[:arr][:vals], "sorted" => params[:arr][:vals].dup}
      startTime = Time.now
      @arr["sorted"] = @algorithm.quick_sort(@arr["sorted"].map(&:to_i),0,15)
      @arr[:runtime] = (Time.now - startTime)
      redirect_to controller: 'welcome', action: 'interview_prep', locals: {arr: @arr}
    end
  end

  # GET /algorithms/1/edit
  def edit

  end

  # POST /algorithms
  # POST /algorithms.json
  def create
    @algorithm = Algorithm.new(algorithm_params)
    if(algorithm_params[:name]=='palindrome')
      @algorithm.isPalindrome()
    end
    if(algorithm_params[:name]=='fibonacci')
      @algorithm[:output] = @algorithm.fibonacci(algorithm_params[:input].to_i)
    end
    respond_to do |format|
      if @algorithm.save
        format.html { redirect_to @algorithm, notice: 'Algorithm was successfully created.' }
        format.json { render :show, status: :created, location: @algorithm }
      else
        format.html { render :new }
        format.json { render json: @algorithm.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /algorithms/1
  # PATCH/PUT /algorithms/1.json
  def update
    respond_to do |format|
      if @algorithm.update(algorithm_params)
        format.html { redirect_to @algorithm, notice: 'Algorithm was successfully updated.' }
        format.json { render :show, status: :ok, location: @algorithm }
      else
        format.html { render :edit }
        format.json { render json: @algorithm.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /algorithms/1
  # DELETE /algorithms/1.json
  def destroy
    @algorithm.destroy
    respond_to do |format|
      format.html { redirect_to algorithms_url, notice: 'Algorithm was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_algorithm
      @algorithm = Algorithm.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def algorithm_params
      params.require(:algorithm).permit(:name, :input, :runtime)
    end
end
