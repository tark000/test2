class LawyerSerializer < ActiveModel::Serializer
  attributes :id, :image, :text, :phone, :name, :email
end
