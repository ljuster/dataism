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
  def quick_sort(a,lo,hi)
    if lo<hi
      p=partition(a,lo,hi)
      quick_sort(a,lo,p-1)
      quick_sort(a,p+1,hi)
    end
    return a
  end

  def partition(a,lo,hi)
    i=lo
    j=hi+1
    pivot= a[lo]
    while true
      #Loop to increment i
      begin
        i+=1
        break if i==hi
      end while a[i]<pivot
      #Loop to increment j
      begin
        j-=1
        break if j==lo
      end while a[j]>pivot
      # break the loop if pointers cross
      break if i>=j
      #Swap arr[i] and arr[j]
      temp=a[i]
      a[i]=a[j]
      a[j]=temp
    end
    # Swap arr[lo] with arr[j]
    temp=a[lo]
    a[lo]=a[j]
    a[j]=temp
    puts a.to_s
    return j
  end

  def fibonacci(n)
    if n > 1
      fibonacci(n - 1) + fibonacci(n-2)
    else
      n
    end
  end

  # @param [String] words
  def setupDictionary(words)
    dictionary = {}
    words.each { |word|
      word = word.trim()
      if word != ""
        if !dictionary.key?(word)
          dictionary[:word] = 1
        else
          dictionary[:word] +=1
        end
      end
    }
  end

  def getFrequency(word)

  end

  def depth_first_search(adj_matrix, source_index, end_index)
    node_stack = [source_index]

    loop do
      curr_node = node_stack.pop()
      return false if curr_node == nil
      return true if curr_node == end_index

      children = (0..adj_matrix.length-1).to_a.select do |i|
        adj_matrix[curr_node][i] == 1
      end

      node_stack = node_stack + children

    end
  end

  def breadth_first_search(adj_matrix, source_index, end_index)
    node_queue = [source_index]

    loop do
      curr_node = node_queue.pop()
      return false if curr_node == nil
      return true if curr_node == end_index

      children = (0..adj_matrix.length-1).to_a.select do |i|
        adj_matrix[curr_node][i] == 0
      end

      node_queue = children + node_queue

    end

  end


end
