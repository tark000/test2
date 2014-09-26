class Ability
  include CanCan::Ability

  def initialize(user)

    alias_action :create, :read, :update, :destroy, :to => :crud
    model_list2 = [Advert, AdvertImage, BusinessCenterClass, Category, City,CurrencyUser, District, Door,
                   Email, FlatType, FloorType,HouseMaterial,HouseType,Layout,Management,MetroStation,Movie,
                   Notariat,OperationType,PurpouseLand,Region,Role,RoomsType,StateRepair,Street,User,EmailImage]

    if user
      can :crud, Comment,  :user_id => user.id
      can :read, :all

      can :manage, User
      if user.has_role? :admin
        #model_list1 = [BlogTheme , Comment, Lawyer]
        #RailsAdmin.config do |config|
        #  model_list1.each do |m|
        #    config.model m do
        #      visible false
        #    end
        #  end
        #
        #end
        can :manage, :all
        can :access, :rails_admin       # only allow admin users to access Rails Admin
        can :dashboard
        RailsAdmin.config do |config|
          model_list2.each do |m|
            if m == Notariat
              config.model m do
                visible true
                edit do
                  field :title
                  field :image
                  field :text do
                    ckeditor true
                  end
                end
              end

            elsif m == Management
              config.model m do
                visible true
                edit do
                  field :title
                  field :image
                  field :text do
                    ckeditor true
                  end
                end
              end




            else

              config.model m do
                visible true

              end
            end


          end
          config.model BlogTheme do
            visible false
          end
          config.model Comment do
            visible false
          end
          config.model Lawyer do
            visible false
          end
        end

      else
        if user.has_role?(:lawyer)


          RailsAdmin.config do |config|
            model_list2.each do |m|
              config.model m do
                visible false
              end
            end
            config.model BlogTheme do
              visible true
            end
            config.model Comment do
              visible true
            end
            config.model Lawyer do
              visible true
            end
          end

          can :access, :rails_admin
          can :dashboard
          can :manage, BlogTheme
          can :manage, Comment
          can :manage, Lawyer
        end




      end
    end




  end
end
