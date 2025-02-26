export default class CInputs
  def initialize(parent)
    @parent = parent

    @h_upload_file_input_change = lambda {|e| upload_file_input_change(e) }

    @upload_file_input = @parent.query_selector('#adminImagesUploadFileInput')

    window.admin_images_dropdown_btn_upload_click = dropdown_btn_upload_click
    window.admin_images_dropdown_btn_remove_click = dropdown_btn_remove_click
  end

  def connected_callback()
    @upload_file_input.add_event_listener('change', @h_upload_file_input_change)
  end

  def disconnected_callback()
    @upload_file_input.remove_event_listener('change', @h_upload_file_input_change)
  end

  def upload_file_input_change(event)
    file = event.target.files[0]
    @parent.image_compressor.compress_image(file) do |base64_image, mime|
      base64_segments = base64_image.base64_split()

      options = {
        name: file.name.sub(/\..*$/, ''),
        description: nil,
        file_type: mime,
        segments: base64_segments
      }

      @parent.c_database.save_file(options) do |message|
        puts message
      end
    end
  end

  def dropdown_btn_upload_click()
    @upload_file_input.click()
  end

  def dropdown_btn_remove_click()
    
  end
end