json.extract! image, :id, :description, :name, :url, :price, :created_at, :updated_at
json.url image_url(image, format: :json)
