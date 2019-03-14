class AddOutputToAlgorithms < ActiveRecord::Migration[4.2]
  def change
    add_column :algorithms, :output, :string
  end
end
