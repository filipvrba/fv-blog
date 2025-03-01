import 'CDatabase', '../components/elm-img-loader/database'

export default class ElmImgLoader < HTMLElement
  attr_reader :file_id

  def initialize
    super

    @file_id = self.get_attribute('file-id') || nil
    @is_rounded = self.get_attribute('rounded') == ''
    
    init_elm()

    @c_database = CDatabase.new(self)
  end

  def connected_callback()
    class_rounded = @is_rounded ? "rounded-3" : ''

    l_no_image = lambda do
      self.innerHTML = "<img src='/imgs/no_img_01.jpg' class='img-fluid #{class_rounded}' alt='No Image Available'>"
    end

    if @file_id
      @c_database.get_image() do |image|
        if image
          self.innerHTML = "<img src='#{image.src}' class='img-fluid #{class_rounded}' alt='#{image.alt}'>"
        else
          l_no_image.call()
        end
      end
    else
      l_no_image.call()
    end
  end

  def disconnected_callback()
  end

  def init_elm()
    template = "<div style='height: 128px;'><elm-spinner class='spinner-overlay'></elm-spinner></div>"

    self.innerHTML = template
  end
end