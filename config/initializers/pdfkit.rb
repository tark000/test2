PDFKit.configure do |config|
  config.default_options = {
      :encoding      => 'UTF-8',
      :page_size     => 'Letter',
      :margin_top    => '0px',
      :margin_right  => '0px',
      :margin_bottom => '0px',
      :margin_left   => '0px'
  }
end