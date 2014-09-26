class Role < ActiveRecord::Base
  has_and_belongs_to_many :users, :join_table => :users_roles
  belongs_to :resource, :polymorphic => true
  
  scopify

  before_save :change_resource_type


  def change_resource_type
    self.resource_type = nil
  end
  # attr_accessible :title, :body
end
