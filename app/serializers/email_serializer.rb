class EmailSerializer < ActiveModel::Serializer
  self.root = false
  attributes :id, :mail


end
