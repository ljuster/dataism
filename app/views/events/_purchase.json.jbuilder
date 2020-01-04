json.extract! purchase, :id, :name, :email, :description, :image, :purchase_date, :created_at, :updated_at
json.url purchase_url(purchase, format: :json)