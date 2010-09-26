class User < ActiveRecord::Base
  devise :database_authenticatable, :rememberable, :encryptable
  attr_accessible :email, :password, :password_confirmation
end
