if @selected_city.nil?
  json.selected_city nil
else
  json.selected_city do
    json.(@selected_city, :id, :city, :state_code)
  end
end

if @selected_state.nil?
  json.selected_state nil
else
  json.selected_state do
    json.(@selected_state, :active, :id, :name, :code)
  end
end

if @selected_date.nil?
  json.selected_date nil
else
  json.selected_date @selected_date
end
