# encoding: utf-8
#!/home/taras/.rvm/rubies/ruby-1.9.3-p448/bin/ruby

require 'mysql2'
ENV['RAILS_ENV'] = "development"
require '../config/environment.rb'
require 'uuid'
require 'fastimage'

path_copy = "#{Rails.root.to_s}/public/uploads/advert"
path = "/home/stas/DEV/Projects/Doro/Images_06.24"

def uuid
  UUID.state_file = false
  uuid = UUID.new
  uuid.generate

end

def copy_with_path(src, img_file, mounted_as,id,model)
  dst = "#{Rails.root.to_s}/public/uploads/#{model}/#{mounted_as}/#{id}"
  unless File.directory?(dst)
    FileUtils.mkdir_p(dst)
  end
  FileUtils.cp(src, "#{dst}/#{img_file}")
  "#{dst}/#{img_file}"
end


house = Mysql2::Client.new(:host => "localhost", :username => "root",:password=>"wasq12", :database=>"house_real",:encoding => 'utf8')

time = 0



# dorohouse
#
# house.query('select id, name from advert_operationtype').each do |row|
#   puts "import views %s" % row['name']
#   OperationType.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
# #
# house.query('select id, name from advert_businesscenterclass').each do |row|
#   puts "import views %s" % row['name']
#   BusinessCenterClass.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
# #
# house.query('select id, name, area_id from advert_city').each do |row|
# puts "import views %s" % row['name']
# City.create([:id=>row['id'],:name=>row['name'], :region_id=>row['area_id']],:without_protection=>true)
# end
#
# house.query('select id, name from advert_currency').each do |row|
# puts "import views %s" % row['name']
# CurrencyUser.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
# house.query('select id, name, cityid_id from advert_cityarea').each do |row|
# puts "import views %s" % row['name']
# District.create([:id=>row['id'],:name=>row['name'], :city_id=>row['cityid_id']],:without_protection=>true)
# end
#
# house.query('select id, name from advert_doortype').each do |row|
# puts "import views %s" % row['name']
# Door.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
# house.query('select id, name from advert_flattype').each do |row|
# puts "import views %s" % row['name']
# FlatType.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
# house.query('select id, name from advert_floortype').each do |row|
# puts "import views %s" % row['name']
# FloorType.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
# house.query('select id, name from advert_housematerial').each do |row|
# puts "import views %s" % row['name']
# HouseMaterial.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
# house.query('select id, name from advert_housetype').each do |row|
# puts "import views %s" % row['name']
# HouseType.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
# house.query('select id, name from advert_metro').each do |row|
# puts "import views %s" % row['name']
# MetroStation.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
#
# house.query('select id, name from advert_landpurpose').each do |row|
# puts "import views %s" % row['name']
# PurpouseLand.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
# house.query('select id, name from advert_roomtype').each do |row|
# puts "import views %s" % row['name']
# RoomsType.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
# house.query('select id, name from advert_countryarea').each do |row|
# puts "import views %s" % row['name']
# Region.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
# #
# #
# #
# house.query('select id, name from advert_stateofrepair').each do |row|
# puts "import views %s" % row['name']
# StateRepair.create([:id=>row['id'],:name=>row['name']],:without_protection=>true)
# end
#
# house.query('select id, name, cityid_id from advert_street').each do |row|
#   puts "import views %s" % row['name']
#   puts "import views %s" % row['cityid_id']
#
#   Street.create([:id=>row['id'],:name=>row['name'], :city_id=>row['cityid_id']],:without_protection=>true)
# end


=begin

@th = [1..13]
@th[0]=0
@th[1]=400
@th[2]=800
@th[3]=1200
@th[4]=1600
@th[5]=2000
@th[6]=2400
@th[7]=2800
@th[8]=3200
@th[9]=3600
@th[10]=4000
@th[11]=4400
@th[12]=4800

Parallel.map(@th) do |t|
  ActiveRecord::Base.connection.reconnect!
  photo = Mysql2::Client.new(:host => "localhost", :username => "root",:password=>"wasq12", :database=>"house_real",:encoding => 'utf8')

    photo.query("select id, picture, advert_id from advert_photo limit 400 offset #{t} ").each do |row|
    #photo.query("select id, picture, advert_id from advert_photo where advert_id=351 ").each do |row|

    #
    old_name = "#{path}/#{row['picture']}"
    #puts old_name
    check = FastImage.type(old_name)
    #binding.pry
    if check == :png or check == :jpg or check == :jpeg
      begin
        new = "#{uuid}#{File.extname(old_name)}"
        puts "import  advert id %s" % row['advert_id']
        puts "import  photo %s" % row['picture']
        img = AdvertImage.create!([:id=>row['id'],:advert_id=>row['advert_id']],:without_protection=>true)
        #binding.pry
        new_file = copy_with_path(old_name, new, "image",img[0].id,"advert_image")
        img[0].image.store!(File.open(new_file))
        img[0].save!
      rescue => e
        puts "image crached =#{e.message}"
      end

    else
      puts "file is not image %s" % row['picture']
    end

  end

 end
=end


=begin
@th = [1..15]
@th[0]=0
@th[1]=30
@th[2]=60
@th[3]=90
@th[4]=120
@th[5]=150
@th[6]=180
@th[7]=210
@th[8]=240
@th[9]=270
@th[10]=300
@th[11]=330
@th[12]=360
@th[13]=390
@th[14]=420

Parallel.map(@th) do |t|
  ActiveRecord::Base.connection.reconnect!
  house.query("select id, planing, advert_id from advert_photoposter limit 30 offset #{t} ").each do |row|
    puts "import planing %s"
    old_name = "#{path}/#{row['planing']}"
    new = "#{uuid}#{File.extname(old_name)}"

    img = Layout.create!([:id=>row['id'],:advert_id=>row['advert_id']],:without_protection=>true)
    begin
      new_file = copy_with_path(old_name, new, "image",img[0].id,"layout")
    rescue =>e
      puts e.message
    end

    begin
      img[0].image.store!(File.open(new_file))
    rescue =>e
      puts e.message
    end

    img[0].save!

  end
end
=end


#
#
# house.query('select id, video, adv_id from advert_youtube').each do |row|
# puts "import views %s" % row['name']
# Movie.create([:id=>row['id'], :video=>row['video'], :advert_id=>['adv_id']],:without_protection=>true)
# end
#
# Category.create(:name=>'Офис')
# Category.create(:name=>'нежилое помещение')
# Category.create(:name=>'Магазин')
# Category.create(:name=>'Склад')
# Category.create(:name=>'Жилое')
# Category.create(:name=>'Дома')
# Category.create(:name=>'Гостиница')
# Category.create(:name=>'Здания')



@th = [1..9]
@th[0]=0
@th[1]=50
@th[2]=100
@th[3]=150
@th[4]=200
@th[5]=250
@th[6]=300
@th[7]=350
@th[8]=400

Parallel.map(@th) do |t|
ActiveRecord::Base.connection.reconnect!
db = Mysql2::Client.new(:host => "localhost", :username => "root",:password=>"wasq12", :database=>"house_real",:encoding => 'utf8')

db.query("select id, realtype_id, city_id, cityarea_id, street_id, housenumber, housematerial_id, housetype_id,
                     rooms, roomstype_id, floor, floors, landsize, title, desciption, square, squarelife, kitchen, home_deadline,
                     free_from, floor_type_id, wc_count, stateofrepair_id, ceill_height, distance, hotadv, created, modified, cost,
                     usercost, costforall, usercurrency_id,  viewcount, metro_id, door_id, term_accommodation_id,
                     businesscenterclass_id, separateentrance_id, bussinesperiod_id, planning, poster, user_id,
                     slug, torg, free_to, operationtype_id, comissionvalue, flattypeid_id, video, admin, countryarea_id,
                     youtube, trassadirection_id, landpurpose_id, usercostforall, locationofproperty_id,
                     bussinesperiod_id, cabinetcount, locationofproperty_id, countryarea_id, roomstype_id  from advert_advert limit 50 offset #{t} ").each do |row|
   #puts row
   puts "import adverts_old %s" % row['id']
   @cat = row['realtype_id']
   if @cat==3 || @cat==24 || @cat==29 || @cat==31 || @cat==32 || @cat==30
     @new_category = 1
   elsif @cat==8 || @cat==13 || @cat==14 || @cat==16 || @cat==17 || @cat==21 || @cat==25 || @cat==28 || @cat==4 || @cat==7 || @cat==10 || @cat==11 || @cat==12 || @cat==18 || @cat==19 || @cat==20 || @cat==30
     @new_category = 2
   elsif @cat==26 || @cat==9
     @new_category = 3
   elsif @cat==5 || 15
     @new_category = 4
   elsif @cat==1
     @new_category = 5
   elsif @cat==2 || @cat==23
     @new_category = 6
   elsif @cat==6 || 27
     @new_category = 7
   elsif @cat==20
     @new_category = 8
   end

   if row['realtype_id'] == 1 || row['realtype_id']==2 || row['realtype_id']==23
     @liv = 1
   else
     @liv = 0
   end
   if row['roomstype_id'] == 1
     @room_type = 0
   else
     @room_type = 1
   end


   tempvideo = row['youtube'].match(/(?:https?:\/\/)?(?:www\.)?(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/) if row['youtube'].present?
   if tempvideo.class != NilClass
     video =  '<iframe width="420" height="315" src="' + tempvideo.to_s + '" frameborder="0" allowfullscreen></iframe>'
   elsif
   video = ''
   end

   advert = Advert.create!([:id=>row['id'], :title=>row['title'],:operation_type_id=>row['operationtype_id'], :category_id=>@new_category,
                            :price=>row['cost'], :area=>row['square'], :all_price=>row['costforall'], :house_material_id=>['housematerial_id'],
                            :house_type_id=>['housetype_id'], :city_id=>row['city_id'],:district_id=>row['cityarea_id'], :street_id=>row['street_id'],
                            :house=>row['housenumber'], :rooms=>['rooms'], :floor=>['floor'], :floors=>['floors'],
                            :video=>row['youtube'], :description=>row['desciption'],
                            :trassa_diraction_id=>row['trassadirection_id '],
                            :purpouse_land_id=>row['landpurpose_id'], :landsize=>row['landsize'], :life_area=>row['squarelife'],
                            :kitchen=>row['kitchen'],
                            :home_deadline=>row['home_deadline'], :floor_type_id=>row['floor_type_id'], :wc_count=>row['wc_count'],
                            :state_repair_id=>row['stateofrepair_id'], :ceill_height=>row['ceill_height'], :distance=>row['distance'],
                            :hotadv=>row['hotadv'],:usercost=>row[':usercost'], :usercostforall=>row['usercostforall'],
                            :currency_user_id=>row['usercurrency_id'], :viewcount=>row['viewcount'], :metro_station_id=>row['metro_id'],
                            :door_id=>row['door_id'], :accommodation_term_id=>row['term_accommodation_id'],
                            :preporty_location_id=>row['locationofproperty_id'], :business_center_class_id=>row['businesscenterclass_id'],
                            :separate_entrence_id=>row['separateentrance_id'], :cabinetcount=>row['cabinetcount'],
                            :busines_period_id=>row['bussinesperiod_id'], :user_id=>row['user_id'], :slug=>row['slug'], :torg=>row['torg'],
                            :free_from=>row['free_from'], :free_to=>row['free_to'], :commission=>row['comissionvalue'], :flat_type_id=>row['flattypeid_id'],
                            :admin=>row['admin'],:region_id=>row['countryarea_id'], :mapaddress=>row['mapaddress'],:youtube=>video,
                            :living=>@liv, :room_type=>@room_type
                           ],:without_protection=>true)

   #:photo=>row['poster'],
   #:layout=>row['planning'],

     old_photo = "#{path}/#{row['poster']}"
     old_layout = "#{path}/#{row['planning']}"
     new_photo = "#{uuid}#{File.extname(old_photo)}"
     new_layout = "#{uuid}#{File.extname(old_layout)}"

     begin
       new_file_photo = copy_with_path(old_photo, new_photo, "photo",advert[0].id,"advert")
     rescue =>e
       puts e.message
     end

     begin
       new_file_layout = copy_with_path(old_layout, new_layout, "layout",advert[0].id,"advert")
     rescue =>e
       puts e.message
     end


     begin
       advert[0].photo.store!(File.open(new_file_photo))
     rescue =>e
       puts "image crached =#{e.message}"
     end

     begin
       advert[0].layout.store!(File.open(new_file_layout))
     rescue => e
       "image crached =#{e.message}"
     end

     advert[0].save!


     #binding.pry
     #t.boolean :living, default: 0
     #t.boolean :room_type, default: 0
     #t.float   :latitude
     #t.float   :longitude
     #t.string  :message

     time = time+1
     puts "import advert N #{time}"

  end
end
