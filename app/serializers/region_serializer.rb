class RegionSerializer < ActiveModel::Serializer
  self.root = false
  attributes :id, :name, :catalog
  #has_many :adverts_old


  def catalog
    c = []
    # c.push(object.name)
    object.cities.map{
        |a|  c.push({id:a.id,name:a.name});


    }
    return c
  end

end
