class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  attr_accessible :email, :password, :password_confirmation, :name, :phone

  has_many :comments

  def title
    self.email
  end

  def name
    self.email
  end




  has_and_belongs_to_many :roles, :join_table => :users_roles
end
