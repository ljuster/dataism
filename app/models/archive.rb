require 'open-uri'
require 'zlib'

class Archive < ActiveRecord::Base




  def getTimeSpan(after,before)
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

end
