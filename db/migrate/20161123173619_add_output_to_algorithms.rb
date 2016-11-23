class AddOutputToAlgorithms < ActiveRecord::Migration
  def change
    add_column :algorithms, :output, :string
  end
end
