xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  xml.url do
    xml.loc "http://dorohouse.resumeo.me/"
    xml.priority 1.0
  end
  for a in @adverts
    xml.url do
      xml.loc "http://dorohouse.resumeo.me/#!/adverts/#{a.slug}"
      xml.changefreq("weekly")
      xml.priority("0.7")
      if a.updated_at.nil?
        xml.lastmod(a.created_at.strftime("%Y-%m-%d"))
      else
        xml.lastmod(a.updated_at.strftime("%Y-%m-%d"))
      end
    end
  end
end