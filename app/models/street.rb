class Street < ActiveRecord::Base
  attr_accessible :city_id, :name, :district_id

  has_many :adverts
  belongs_to :city
  belongs_to :district

=begin
  after_create :reindex!
  after_update :reindex!
=end

  searchable do
    #fulltext params[:search] do
    #  fields(:name)
    #end
    text :name, :boost =>5
    integer :city_id
  end


end
