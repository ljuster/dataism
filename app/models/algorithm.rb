class Algorithm < ActiveRecord::Base

  def isPalindrome()
    input = self[:input].downcase
    startTime = Time.now
    for i in 0..input.length/2
      if input[i]!=input[input.length-1-i]
        self[:runtime] = (Time.now - startTime)
        self[:isPalindrome]=false
        return
      end
    end
    self[:runtime] = (Time.now - startTime)
    self[:isPalindrome] =true
  end


end
