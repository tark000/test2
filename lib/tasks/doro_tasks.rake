namespace :doro_tasks do
  desc "TODO"
  task :change_status => :environment do
    Advert.all.each do |a|
      a.save
    end
  end

end
