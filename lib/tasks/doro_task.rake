namespace :doro_task do


  task :pdf => :environment do
    puts "test"
    #HomeController.new.sitemap
    Advert.last.save
  end


end