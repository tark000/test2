class UserShowSerializer < ActiveModel::Serializer
  self.root = false

  attributes :id, :email, :name, :phone, :first_comment, :admin, :lawyer


  def first_comment
    return object.name.present? && object.phone.present?
  end

  def admin
    object.has_role? :admin
  end


  def lawyer
    object.has_role? :lawyer
  end
end
