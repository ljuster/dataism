class AddIsPalindromeToAlgorithms < ActiveRecord::Migration
  def change
    add_column :algorithms, :isPalindrome, :boolean
  end
end
