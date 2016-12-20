require 'optparse'
require 'open-uri'
require 'zlib'
require 'yajl/yajl'
require 'pg'


## Option parser to read in args from command line
##  @param [--after DATETIME]
#   @param [--before DATETIME]
#   @param [--event EVENT_NAME]
#   @param [-n COUNT]

options = {:after => nil, :before => nil, :event => nil, :count => nil}

parser = OptionParser.new do|opts|
  opts.banner = "Usage: archive.rb [options]"
  opts.on('-a', '--after DATETIME', 'DATETIME') do |datetime|
    options[:after] = datetime;
  end

  opts.on('-b', '--before DATETIME', 'DATETIME') do |datetime|
    options[:before] = datetime;
  end

  opts.on('-e', '--event event', 'Event') do |event|
    options[:event] = event;
  end

  opts.on('-c', '--count count', 'Count') do |count|
    options[:count] = count;
  end

  opts.on('-h', '--help', 'Displays Help') do
    puts opts
    exit
  end
end

parser.parse!

## Connect to db, insert parsed json data

    start_date = options[:after]
    end_date = options[:before]

    begin

      con = PG.connect :dbname => 'lcj_development'
      con.exec "DROP TABLE IF EXISTS Archives"
      con.exec "CREATE TABLE Archives(Id INTEGER PRIMARY KEY,
            Name VARCHAR(200), Count INT)"

      # grab json data from specified timeframe
      gz = open('http://data.githubarchive.org/2015-01-12-5.json.gz')
      # gz = open("http://data.githubarchive.org/#{time_span}.json.gz")

      # unzip it
      js = Zlib::GzipReader.new(gz).read
      gz.close()

      # # parse and only update records with event matching
      Yajl::Parser.new.parse(js) do |event|
        user_id = event["actor"]["id"]
        name = event["actor"]["login"]
        if event["type"] == "#{options[:event]}"
          rs = con.exec "SELECT Count(*) FROM Archives WHERE id=#{user_id}"
          if(rs.values[0][0].to_i == 0)
            rs.clear()
            con.exec("INSERT into Archives VALUES (#{user_id}, '#{name}', 1)")
          else
            rs = con.exec "SELECT count FROM Archives WHERE id=#{user_id}"
            con.exec "UPDATE Archives SET count=#{rs.values[0][0].to_i+1} WHERE Id=#{user_id}"
            rs.clear()
          end
        end
      end
      rs = con.exec "SELECT (name, count) from Archives order by count desc limit(#{options[:count]})"
      rs.each do |row|
        name = row.values[0].tr('()','').split(',')[0]
        count = row.values[0].tr('()','').split(',')[1]
        puts name + ' - ' + count + ' events'
      end
    rescue PG::Error => e

      puts e.message

    ensure

      con.close if con

    end



