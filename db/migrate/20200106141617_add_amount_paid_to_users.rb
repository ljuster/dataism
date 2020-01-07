class AddAmountPaidToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :amount_paid, :float, default: 0.0
  end
end
