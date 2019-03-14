class DataFile < ActiveRecord::Base
  attr_accessor :data

  def initialize(params)
    @df = Daru::DataFrame.from_csv(params[:path])
    @data = clean(Daru::DataFrame.from_csv(params[:path]), params[:type])
    @corr_mat = calc_corr(@data) if params[:corr]
    # @df['overall'].data.data = Vector.elements(@df['overall'].data.data).normalize.to_a
    # @df['fg_pct'].data.data = Vector.elements(@df['fg_pct'].data.data).normalize.to_a
    # pearson = Statsample::Bivariate::Pearson.new(@df['overall'], @df['fg_pct'])
    # puts pearson.r
    # puts pearson.t
    # puts pearson.probability
    # puts pearson.summary
  end


  def clean(df, type)
    if type == "conference"
      df.sort(['overall'])
    end
    hash = {}
    df.each do |row|
        if !row.data.data[0].is_a?(String)
          hash[row.name] = {raw: row.data.data, normalized: Vector.elements(row.data.data).normalize}
        else
          hash[row.name] = {raw: row.data.data}
        end
    end
    hash
  end
  # Bivariate ~ 'Pearson'
    # Assumptions: continuous vars
  # Absence of outliers refers to not having outliers in either variable.
  # Having an outlier can skew the results of the correlation by pulling the line of
  # best fit formed by the correlation too far in one direction or another.
  # Typically, an outlier is defined as a value that is 3.29 standard deviations
  # from the mean, or a standardized value of less than ±3.29.
  #     Linearity and homoscedasticity refer to the shape of the values formed by the
  # scatterplot. For linearity, a “straight line” relationship between the variable should
  # be formed.  If a line were to be drawn between all the dots going from left to right,
  # the line should be straight and not curved.  Homoscedasticity refers to the distance
  # between the points to that straight line. The shape of the scatterplot should be
  # tube-like in shape. If the shape is cone-like, then homoskedasticity would not be met.

  def calc_corr(data)
    fields = data.keys.join(' ')
    # ds = data.to_dataset(data.keys.join(' '))
    # vect = Statsample::Vector.new([1,2,3])
    # ds = Statsample::Dataset.new({'v1'=>%w{1 2 3}.to_vector, 'v2'=>%w{4 5 6}.to_vector})
    # @cm = Statsample::Bivariate.correlation_matrix(data)
    data.keys do |key|
      vect = Statsample::Vector.new(data[key][:raw])
      1==1
    end
  end

end
