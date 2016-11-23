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


  # Pick random element and partition the array
  def quickSort(arr, left, right)

    if (left < right)
      index = partition(arr, left, right)
      if left < index - 1   # sort left half
        quickSort(arr, left, index-1)
      end
      if index < right    # sort right half
        quickSort(arr, index,right)
      end
    end
  end


  def partition(arr, left, right)
    pivot = arr[right-1]
    while left <= right
      while arr[left] < pivot  #Find element on left that should be on right
        left=left+1
      end
      while arr[right] > pivot  #Find element on right that should be on left
        right=right-1
      end
      if left <= right
        swap(arr,left,right)
        puts arr.to_s
        left=left+1
        right=right-1
      end
    end
    return left
  end

  def swap(arr,left,right)
    temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
  end

  def fibonacci(n)
    if n > 1
      sum = sum + fibonacci(n - 1) + fibonacci(n-2)
    elsif n == 1
      sum = sum+1
    else
      sum
    end
  end


end
