import 'CDatabase', '../components/elm-img-loader/database'

export default class ElmImgLoader < HTMLElement
  attr_reader :file_id

  def initialize
    super

    @file_id = self.get_attribute('file-id')
    
    init_elm()

    @c_database = CDatabase.new(self)
  end

  def connected_callback()
    @c_database.get_image() do |image|
      # puts image
      self.innerHTML = "<img src='#{image.src}' class='img-fluid' alt='#{image.alt}'>"
    end
  end

  def disconnected_callback()
  end

  def init_elm()
    template = "<div style='height: 128px;'><elm-spinner class='spinner-overlay'></elm-spinner></div>"

    self.innerHTML = template
  end
end