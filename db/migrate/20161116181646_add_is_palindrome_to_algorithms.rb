class AddIsPalindromeToAlgorithms < ActiveRecord::Migration[4.2]
  def change
    add_column :algorithms, :isPalindrome, :boolean
  end
end
