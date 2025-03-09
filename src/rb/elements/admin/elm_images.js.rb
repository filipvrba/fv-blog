import 'CInputs',   '../../components/admin/elm-images/inputs'
import 'CDatabase', '../../components/admin/elm-images/database'
import 'CProgress', '../../components/admin/elm-images/progress'
import 'CContents', '../../components/admin/elm-images/contents'
import 'CSpinner',  '../../packages/template-rjs-0.1.1/components/spinner'

import 'CInputsAdminImagesModal', '../../components/admin/elm-images-modal/inputs'

export default class ElmAdminImages < HTMLElement
  attr_reader :user_id, :image_compressor
  attr_reader :c_database, :c_progress, :c_contents

  def initialize
    super
    @h_images_modal_save = lambda {|e| images_modal_save(e.detail.value)}

    @user_id = self.get_attribute('user-id')

    init_elm()

    @image_compressor = ImageCompressor.new(1280, 720)
    @c_spinner  = CSpinner.new(self)
    @c_inputs   = CInputs.new(self)
    @c_database = CDatabase.new(self)
    @c_progress = CProgress.new(self)
    @c_contents = CContents.new(self)

    @c_contents.update_table()
  end

  def connected_callback()
    @c_inputs.connected_callback()

    Events.connect('#app', CInputsAdminImagesModal::ENVS.save, @h_images_modal_save)
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback()
    @c_progress.disconnected_callback()

    Events.disconnect('#app', CInputsAdminImagesModal::ENVS.save, @h_images_modal_save)
  end

  def images_modal_save(options)
    @c_inputs.upload_file_details = options
    @c_inputs.upload_file_input.click()
  end

  def set_spinner_visibility(is_visible)
    @c_spinner.set_display_with_id(is_visible, '#spinnerAdminImages')
  end

  def init_elm()
    template = """
<input type='file' id='adminImagesUploadFileInput' style='display: none;'>
<div class='container mt-5'>
  <h1 class='text-center'>Správa obrázků</h1>
  <div id='adminImagesProgress' class='progress' role='progressbar' aria-label='Example 1px high' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100' style='height: 1px'>
    <div class='progress-bar' style='width: 25%'></div>
  </div>
  <div class='card border-0'>
    <elm-spinner id='spinnerAdminImages' class='spinner-overlay'></elm-spinner>

    <table class='table' id='adminImagesTable'>
      <thead>
        <tr>
          <th scope='col'></th>
          <th scope='col'>Název</th>
          <th scope='col'>Popis</th>
          <th scope='col' class='text-end'>
            <div class='dropdown' >
              <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                <i class='bi bi-gear'></i>
                Akce
              </button>
              <ul class='dropdown-menu' >
                <li class='dropdown-header'>
                  Velikost: <span id='adminImagesDropdownHeaderSize'>0 MB</span>
                </li>
                <li>
                  <button class='dropdown-item' onclick='adminImagesDropdownBtnUploadClick()'>Nahrát</button>
                </li>
                <li>
                  <button class='dropdown-item' onclick='adminImagesDropdownBtnRemoveClick()'>Odebrat</button>
                </li>
              </ul>
            </div>
          </th>
        </tr>
      </thead>
      <tbody id='adminImagesTBody'>
        <tr>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<elm-admin-images-modal></elm-admin-images-modal>
    """

    self.innerHTML = template
  end
end