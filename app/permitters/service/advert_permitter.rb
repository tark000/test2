class Service::AdvertPermitter < ActionController::Permitter

  #binding.pry

  permit :user_id, :title, :id, :category_id, :operation_type_id, :photo, :floor, :floors

  #permit {street_id: [:id]}
=begin
         :description, :region_id,  :city_id, :accommodation_term_id,
         :business_center_class_id,:currency_user_id, :door_id,
         :flat_type_id,:floor_type_id, :house_material_id, :house_type_id,
         :metro_station_id, :purpouse_land_id,:room_type, :state_repair_id, :living, :admin, :district_id,
         :all_price, :area, :life_area, :kitchen, :ceill_height, :floor, :floors,
         :torg, :house,
         :landsize, :rooms, :wc_count, :hotadv, :commission, :street_id=>[:id]
=end

=begin
  scope :street_id do |st|
    st.permit :id,  :as=> :street_id
  end
=end

end
