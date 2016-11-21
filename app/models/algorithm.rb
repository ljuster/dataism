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

  def compareBinToHex

  end

  def convertFromBase(number,base)
    if (base < 2 || (base > 10 && base != 16))
      return -1
    end
    value = 0
    for i in (number.length -1).downto(0)
      digit = digitToValue(number.get(i))
      if (digit < 0 || digit >= base)
        return -1
      end

      exp = number.length -1 - i
      value += digit * Math.pow(base,exp)
    end
    return value
  end

  def digitToValue(char)

  end

  def bubbleSort(numbers)

  end

  def selectionSort(numbers)

  end

  def mergeSort(numbers)

  end

  # Pick random element and partition the array
  def quickSort(arr, left, right)
    index = partition(arr, left, right)
    if left < index - 1   # sort left half
      partition(arr, left, index-1)
    end
    if index < right    # sort right half
      partition(arr, index,right)
    end
  end

  def partition(arr, left, right)
    pivot = arr[(left + right) / 2]
    while left <= right
      while arr[left] < pivot
        ++left
      end
      while arr[right] > pivot
        ++right
      end
      if left <= right
        swap(arr,left,right)
        ++left
        --right
      end
    end
  end

  def swap(arr,left,right)
    temp = arr[left]
    arr[left] = right
    right = temp
  end

  def radixSort(numbers)

  end


end
