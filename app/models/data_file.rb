class DataFile < ActiveRecord::Base
  attr_accessor :data

  def initialize(params)
    @data = clean(Daru::DataFrame.from_csv(params[:path]))
  end


  def clean(df)
    df.sort(['overall'])
    hash = {}
    df.each do |row|
        hash[row.name] = row.data.data
    end
    hash
  end
end
