class Service::AdvertsController < ApplicationController
  # encoding: utf-8
  include RestfulJson::DefaultController


  def index

    params.delete('action')
    params.delete('controller')

    @adverts = Advert.where(' `adverts`.`id` > ?', 0).order('`adverts`.`id` desc')
    limit = 12; #default



    if params[:limit].present?
      limit = params[:limit]
    end

=begin
    if params[:map]=='1'
      #binding.pry
      @adverts = Advert.search(params[:search]).order('id desc')
      @adverts = @adverts.with_map
    else
=end
      @adverts = Advert.search(params[:search]).order('`admin` desc, `hotadv` desc, id desc')
#    end
    @adverts = @adverts.category_search(params[:category]) if params[:category].present?
    @adverts = @adverts.operation_type_search(params[:operation]) if params[:operation].present?
    @adverts = @adverts.where(:living => params[:living])  if params[:living].present?
    @adverts = @adverts.state_search(params[:state]) if params[:state].present?
    @adverts = @adverts.city_search(params[:city]) if params[:city].present?
    @adverts = @adverts.min_area_search(params[:area_min]) if params[:area_min].present?
    @adverts = @adverts.max_area_search(params[:area_max]) if params[:area_max].present?
    @adverts = @adverts.commission_search(params[:commission]) if params[:commission].present?
    @adverts = @adverts.marking_search(params[:marking]) if params[:marking].present?
    @adverts = @adverts.metro_search(params[:metro]) if params[:metro].present?
    @adverts = @adverts.free_search(params[:free]) if params[:free].present?

    if params[:by_all] == '1'
      #binding.pry
      @adverts = @adverts.all_min_price_search(params[:price_min]) if params[:price_min].present?
      @adverts = @adverts.all_max_price_search(params[:price_max]) if params[:price_max].present?
    elsif params[:by_all] == '0'
      @adverts = @adverts.min_price_search(params[:price_min]) if params[:price_min].present?
      @adverts = @adverts.max_price_search(params[:price_max]) if params[:price_max].present?
    end

    if params[:favorites].present?

      @adverts = @adverts.where('id in (?)',params[:favorites].split(","))
    end



    if params[:new].present? && params[:new].to_i==1
      @adverts = @adverts.sale_search()
    end





    if params[:solr].present?

      @temp = Sunspot.search(Advert) {
        fulltext params[:solr]

      }.results

      @list = @temp.map {|a| a.id}
      @adverts = @adverts.where('id in (?) ', @list).reorder('id desc')

    end

    if params[:sort].present?
      if params[:sort] == "price_up"
        @adverts = params[:by_all] == '0' ? @adverts.sort_by { |a| -(a.price.to_i) } : @adverts.sort_by { |a| -(a.all_price.to_i) }
      elsif params[:sort] == "price_down"
        @adverts = params[:by_all] == '0' ? @adverts.sort_by { |a| +(a.price.to_i) } : @adverts.sort_by { |a| +(a.all_price.to_i) }
      elsif params[:sort] == "area_up"
        @adverts = @adverts.sort_by { |a| -(a.area.to_i) }
      elsif params[:sort] == "area_down"
        @adverts = @adverts.sort_by { |a| +(a.area.to_i) }
      end
    end

    @area_array = @adverts.map {|x| x.price}
    @area_array = @area_array.compact
    @max = @area_array.max
    @min = @area_array.min

    @count =  @adverts.count()

    if params[:map]=='1'

      render :json => @adverts, :status => 201,  each_serializer: IndexAdvertSerializer , meta: {total:@count}

    else
      if params[:page]=='0' || params[:page].blank?
        page = 1
      else
        page = params[:page]
      end

      @adverts = @adverts.paginate(:page => page, :per_page => 12)
      render :json => @adverts, :status => 201,  each_serializer: IndexAdvertSerializer , meta: {total:@count, max:@max, min:@min}

    end



=begin
    if params[:page]=='0' || params[:page].blank?
      page = 1
    else
      page = params[:page]
    end
=end
=begin

    @adverts = @adverts.paginate(:page => page, :per_page => 12)  unless params[:map]=='1'

    render :json => @adverts, :status => 201,  each_serializer: IndexAdvertSerializer , meta: {total:@count}
=end
  end




  def show
    @advert = Advert.find(params[:id])

    render :json => @advert, :status => 201,  serializer: ShowAdvertSerializer
    @advert.viewcount = @advert.viewcount.to_i + 1
    @advert.save
  end


  def update
    #binding.pry
    @advert = Advert.find(params[:id])
    #@advert.mapaddress = Advert.create_map(@advert)

    if params[:image].present?
      if params[:model]=='photo'
        @advert.photo = params[:image]
      end
      if params[:model]=='layout'
        @advert.layout = params[:image]
      end
      @advert.user_id = current_user.id
      @advert.save
    end
    if params[:advert].present?
       params[:advert].delete("abilities")
       params[:advert].delete("image")
       params[:advert].delete("advert_images")

       @advert.user_id = current_user.id
       @advert.update_attributes(advert_params)

    end
    @advert.create_pdf
    #Advert.create_pdf(@advert)
    render :json => @advert, :status => 201
  end


  def edit
    @advert = Advert.find(params[:id])
    render :json => @advert, :status => 201, serializer: EditAdvertSerializer
  end





  private


    def advert_params

      params.require(:advert).permit(:user_id, :title, :id, :category_id, :operation_type_id, :photo,
                                     :description, :region_id,  :city_id, :accommodation_term_id,
                                     :business_center_class_id,:currency_user_id, :door_id,
                                     :flat_type_id,:floor_type_id, :house_material_id, :house_type_id,
                                     :metro_station_id, :purpouse_land_id,:room_type, :state_repair_id, :living, :admin, :district_id,
                                     :all_price, :area, :life_area, :kitchen, :ceill_height, :floor, :floors,
                                     :torg, :house,
                                     :landsize, :rooms, :wc_count, :hotadv, :commission, :street_id, :free_from, :free_to,
                                     :price, :living, :layout, :video,
                                     :cabinetcount, :status, :longitude, :latitude
      )
    end

end