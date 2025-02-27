export default class CInputs
  attr_accessor :upload_file_details
  attr_reader   :upload_file_input

  def initialize(parent)
    @parent = parent
    @h_upload_file_input_change = lambda {|e| upload_file_input_change(e) }

    @upload_file_input   = @parent.query_selector('#adminImagesUploadFileInput')
    @upload_file_details = {name: nil, description: nil}

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

    unless file
      @upload_file_details = {name: nil, description: nil}
      return
    end

    @parent.image_compressor.compress_image(file) do |base64_image, mime|
      base64_segments = base64_image.base64_split()

      options = {
        name: upload_file_details.name || file.name.sub(/\..*$/, ''),
        description: upload_file_details.description || nil,
        file_type: mime,
        segments: base64_segments
      }

      @parent.c_database.save_file(options) do |message|
        @parent.c_progress.save_file(message)
      end
    end
  end

  def dropdown_btn_upload_click()
    Modals.admin_images()
  end

  def dropdown_btn_remove_click()
    elm_images  = Array.from(
      @parent.c_contents.t_body.query_selector_all('[id^="adminImagesCheck'))

    info_images = elm_images.map do |image|
      {image_id: image.id.split('-').last, checked: image.checked}
    end
    checked_images = info_images.select {|h| h.checked}

    unless checked_images.length > 0
      return
    end

    fn_true = lambda do
      id_files = checked_images.map{|h| h.image_id.to_i}

      @parent.set_spinner_visibility(true)
      @parent.c_database.remove_files(id_files) do |message|
        @parent.set_spinner_visibility(false)
        @parent.c_contents.update_table() if message
      end
    end

    Modals.confirm({fn_true: fn_true})
  end
end