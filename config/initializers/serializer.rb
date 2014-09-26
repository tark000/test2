ActiveSupport.on_load(:active_model_serializers) do
  # Disable for all serializers (except ArraySerializer)
  #ActiveModel::Serializer.root = false

  # Disable for ArraySerializer
  #ActiveModel::ArraySerializer.root = false

=begin
  def user_id
    if current_user
      object.user_id = current_user.id

    end
  end
=end

end