import 'CInputs',   '../../components/admin/elm-images/inputs'
import 'CDatabase', '../../components/admin/elm-images/database'

export default class ElmAdminImages < HTMLElement
  attr_reader :user_id, :image_compressor, :c_database

  def initialize
    super
    
    @user_id = self.get_attribute('user-id')

    init_elm()

    @image_compressor = ImageCompressor.new(1280, 720)
    @c_inputs   = CInputs.new(self)
    @c_database = CDatabase.new(self)
  end

  def connected_callback()
    @c_inputs.connected_callback()
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback()
  end

  def init_elm()
    template = """
<input type='file' id='adminImagesUploadFileInput' style='display: none;'>
<div class='container mt-5'>
  <h1 class='text-center'>Správa obrázků</h1>
  <table class='table' id='adminImagesTable'>
    <thead>
      <tr>
        <th scope='col'></th>
        <th scope='col'>Název</th>
        <th id='thSize' scope='col'>Velikost</th>
        <th scope='col' class='text-end'>
          <div class='dropdown' >
            <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
              <i class='bi bi-gear'></i>
              Akce
            </button>
            <ul class='dropdown-menu' >
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
    <tbody id='adminImagesImagesTBody'>
      <tr>
        <td class='text-center'>---</td>
        <td class='text-center'>---</td>
        <td class='text-center'>---</td>
        <td class='text-center'>---</td>
      </tr>
    </tbody>
  </table>
</div>
    """

    self.innerHTML = template
  end
end