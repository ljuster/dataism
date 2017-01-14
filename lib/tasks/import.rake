require 'csv'

namespace :csv do

  desc "Import CSV Data from big west aggregated wbb team data"
  task :import => :environment do
    csv_file_path = "#{Rails.root}/lib/assets/big_west_wbb_2016.csv"
    csv_text = File.read(csv_file_path)
    csv = CSV.parse(csv_text, :headers => true)

    # create file
    df = DataFile.create!({
                              :name => 'big_west_wbb_2016'
                          })

    # create variables
    vars = []
    csv.headers.each_with_index do |header, i|
      vars << Variable.create!({
                                   :name => header,
                                   :data_file_id => df.id
                               })
    end
    #store data for each record
    csv.each do |row|
      hash = {}
      csv.headers.each_with_index do |header, i|
        hash[header] = row[i]
      end
      Record.create!(
          :data => hash,
          :data_file_id => df.id)
      puts "Row added!"

    end
  end
end