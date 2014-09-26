# encoding: utf-8
require 'carrierwave/processing/mini_magick'
require 'carrierwave/processing/rmagick'

class LawyerImageUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick
  include CarrierWave::MiniMagick

  # Include the Sprockets helpers for Rails 3.1+ asset pipeline compatibility:
  include Sprockets::Helpers::RailsHelper
  include Sprockets::Helpers::IsolatedHelper

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  def cache_dir
    'uploads/tmp'
  end

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  #process :convert => 'jpg'
  process :trim_white





  version :small do
    process :resize_to_limit => [180,240 ]

    #process :watermark
  end
  #
  #version :photo do
  #  process :resize_to_limit => [200, 300]
  #end




  def watermark
    manipulate! do |img|
      #image = Magick::Image.read(img)
      #logo = Magick::Image.read("#{Rails.root}/app/assets/images/watermark.png").first
      mark = Magick::Image.new(img.columns, img.rows)
      gc = Magick::Draw.new
      gc.gravity = Magick::CenterGravity
      gc.pointsize = 32
      gc.font_family = "Helvetica"
      gc.font_weight = Magick::BoldWeight
      gc.stroke = 'none'
      gc.annotate(mark, 0, 0, 0, 0, "costatenerife")

      mark = mark.shade(true, 310, 30)

      img = img.composite(mark, Magick::CenterGravity, Magick::HardLightCompositeOp)
    end
  end



  def trim_white
    manipulate! do |img|
      img.trim
      img
    end
  end


  def resize_to_width(width, height)
    manipulate! do |img|
      width_new = img[:width]
      height_new = img[:height]
      if img[:width] >= width
        width_new = width
      end
      if img[:height] >= height
        height_new = height
      end
      img.resize "#{width_new}x#{height_new}"
      img = yield(img) if block_given?
      img
    end
  end

  def my_resize_and_pad(width, height, background, gravity='Center')
    manipulate! do |img|
      cols, rows = img[:dimensions]
      img.combine_options do |cmd|
        width_new = cols
        height_new = rows
        if cols >= width
          width_new = width
        end

        if rows >= height
          height_new = height
        end

        cmd.thumbnail"#{width_new}x#{height_new}>"
        cmd.background background
        cmd.gravity gravity
        cmd.extent "#{width}x#{height}" if cols != width || rows != height
      end
      img = yield(img) if block_given?
      img
    end
  end

  def add_text(width)
    manipulate! do |image|
      image.combine_options do |c|
        c.gravity 'Center'
        c.font Rails.root.join('app/assets/fonts/KOKILAB.TTF').to_s
        c.pointsize (image[:width]/6.5).to_s
        c.draw "text 0,0 'DOROHOUSE'"
        c.fill 'rgba(0,0,0,0.55)'
      end
      image
    end
  end

end