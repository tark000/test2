# coding: utf-8
require "babosa"
class BlogTheme < ActiveRecord::Base
  resourcify
  attr_accessible :description, :title,:slug

  extend FriendlyId
  friendly_id :title, use: :slugged

  def normalize_friendly_id(input)
    input.to_s.to_slug.normalize(transliterations: :russian).to_s
  end


  has_many :comments
end
