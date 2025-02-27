export default class CInputs
  ENVS = {
    show: 'eism-show-0',
    save: 'eism-save-1'
  }

  def initialize(parent)
    @parent = parent
    @h_show = lambda { show() }

    @h_admin_images_modal_file_name_keypress = lambda { admin_images_modal_file_name_keypress() }
    @h_admin_images_modal_file_description_keypress = lambda { admin_images_modal_file_description_keypress() }

    @admin_images_modal_file_name = @parent.query_selector('#adminImagesModalFileName')
    @admin_images_modal_file_description = @parent.query_selector('#adminImagesModalFileDescription')
    @admin_images_modal_btn_save = @parent.query_selector('#adminImagesModalBtnSave')

    window.admin_images_modal_btn_save_click = admin_images_modal_btn_save_click
  end

  def connected_callback()
    @admin_images_modal_file_name.add_event_listener('keypress', @h_admin_images_modal_file_name_keypress)
    @admin_images_modal_file_description.add_event_listener('keypress', @h_admin_images_modal_file_description_keypress)

    Events.connect('#app', ENVS.show, @h_show)
  end

  def disconnected_callback()
    @admin_images_modal_file_name.remove_event_listener('keypress', @h_admin_images_modal_file_name_keypress)
    @admin_images_modal_file_description.remove_event_listener('keypress', @h_admin_images_modal_file_description_keypress)

    Events.disconnect('#app', ENVS.show, @h_show)
  end

  def show()
    if @parent.bs_modal_images._is_shown
      return
    end

    inputs_clean()
    @parent.bs_modal_images.show()
  end

  def admin_images_modal_btn_save_click()
    is_admin_images_modal_file_name = have_admin_images_modal_file_name()
    is_admin_images_modal_file_description = have_admin_images_modal_file_description()

    Bootstrap.change_valid_element(@admin_images_modal_file_name, is_admin_images_modal_file_name)
    Bootstrap.change_valid_element(@admin_images_modal_file_description, is_admin_images_modal_file_description)

    unless is_admin_images_modal_file_name && is_admin_images_modal_file_description
      return
    end

    @parent.bs_modal_images.hide()
    Events.emit('#app', ENVS::save, {
      name: @admin_images_modal_file_name.value,
      description: @admin_images_modal_file_description.value,
    })
  end
  
  def admin_images_modal_file_name_keypress()
    return unless event.key == 'Enter'

    @admin_images_modal_file_description.focus()
  end
  
  def admin_images_modal_file_description_keypress()
    return unless event.key == 'Enter'

    @admin_images_modal_btn_save.click()
  end
  
  def have_admin_images_modal_file_name()
    @admin_images_modal_file_name.value.length >= 0
  end

  def have_admin_images_modal_file_description()
    @admin_images_modal_file_description.value.length > 0
  end

  def inputs_clean()
    @admin_images_modal_file_name.value        = ''
    @admin_images_modal_file_description.value = ''

    Bootstrap.change_valid_element(@admin_images_modal_file_name, true)
    Bootstrap.change_valid_element(@admin_images_modal_file_description, true)
  end
end
