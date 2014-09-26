# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140725114853) do

  create_table "advert_images", :force => true do |t|
    t.string   "image"
    t.string   "advert_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "adverts", :force => true do |t|
    t.text     "title"
    t.integer  "operation_type_id"
    t.integer  "category_id"
    t.boolean  "living",                   :default => false
    t.float    "price"
    t.float    "area"
    t.float    "all_price"
    t.integer  "house_material_id"
    t.integer  "house_type_id"
    t.integer  "city_id"
    t.integer  "district_id"
    t.integer  "street_id"
    t.string   "house"
    t.integer  "rooms"
    t.boolean  "room_type",                :default => false
    t.integer  "floor"
    t.integer  "floors"
    t.text     "photo"
    t.string   "layout"
    t.string   "video"
    t.text     "description"
    t.integer  "trassa_diraction_id"
    t.integer  "purpouse_land_id"
    t.string   "landsize"
    t.float    "life_area"
    t.float    "kitchen"
    t.string   "home_deadline"
    t.integer  "floor_type_id"
    t.integer  "wc_count"
    t.integer  "state_repair_id"
    t.float    "ceill_height"
    t.string   "distance"
    t.boolean  "hotadv",                   :default => false
    t.float    "usercost"
    t.float    "usercostforall"
    t.integer  "currency_user_id"
    t.integer  "viewcount"
    t.integer  "metro_station_id"
    t.integer  "door_id"
    t.integer  "accommodation_term_id"
    t.integer  "preporty_location_id"
    t.integer  "business_center_class_id"
    t.integer  "separate_entrence_id"
    t.string   "cabinetcount"
    t.integer  "busines_period_id"
    t.integer  "user_id"
    t.text     "slug"
    t.boolean  "torg",                     :default => false
    t.string   "free_from"
    t.string   "free_to"
    t.float    "commission",               :default => 0.0
    t.integer  "flat_type_id"
    t.boolean  "admin",                    :default => false
    t.integer  "region_id"
    t.string   "mapaddress"
    t.string   "youtube"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "message"
    t.integer  "rooms_type_id"
    t.datetime "created_at",                                  :null => false
    t.datetime "updated_at",                                  :null => false
    t.text     "pdf"
    t.boolean  "status",                   :default => true
  end

  create_table "blog_themes", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.text     "slug"
  end

  create_table "business_center_classes", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "cities", :force => true do |t|
    t.string   "name"
    t.integer  "region_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "comments", :force => true do |t|
    t.text     "text"
    t.integer  "user_id"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
    t.integer  "blog_theme_id"
    t.boolean  "checked",       :default => false
  end

  create_table "currency_users", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "districts", :force => true do |t|
    t.string   "name"
    t.integer  "city_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "doors", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "email_images", :force => true do |t|
    t.string   "image"
    t.integer  "number"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "emails", :force => true do |t|
    t.string   "mail"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.boolean  "signed",     :default => true
  end

  create_table "flat_types", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "floor_types", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "house_materials", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "house_types", :force => true do |t|
    t.string   "name"
    t.integer  "category_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "lawyers", :force => true do |t|
    t.text     "text"
    t.string   "name"
    t.string   "image"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "phone"
    t.string   "email"
  end

  create_table "layouts_old", :force => true do |t|
    t.string   "image"
    t.string   "advert_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "managements", :force => true do |t|
    t.text     "text"
    t.string   "title"
    t.string   "image"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "metro_stations", :force => true do |t|
    t.string   "name"
    t.integer  "city_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "movies", :force => true do |t|
    t.integer  "advert_id"
    t.string   "video"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "notariats", :force => true do |t|
    t.text     "text"
    t.string   "image"
    t.string   "title"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "operation_types", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "purpouse_lands", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "regions", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "roles", :force => true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "roles", ["name", "resource_type", "resource_id"], :name => "index_roles_on_name_and_resource_type_and_resource_id"
  add_index "roles", ["name"], :name => "index_roles_on_name"

  create_table "rooms_types", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "state_repairs", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "streets", :force => true do |t|
    t.string   "name"
    t.integer  "city_id"
    t.integer  "district_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "name"
    t.string   "phone"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "users_roles", :id => false, :force => true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], :name => "index_users_roles_on_user_id_and_role_id"

end
