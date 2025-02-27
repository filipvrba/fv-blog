import 'CInputs', '../../components/admin/elm-images-modal/inputs'

export default class ElmAdminImagesModal < HTMLElement
  attr_reader :bs_modal_images

  def initialize
    super

    @l_popstate = lambda { popstate() }
    
    init_elm()

    modal_images     = self.query_selector('#adminImagesModal')
    @bs_modal_images = bootstrap.Modal.new(modal_images)

    @c_inputs = CInputs.new(self)
  end

  def connected_callback()
    @c_inputs.connected_callback()

    window.add_event_listener('popstate', @l_popstate)
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback()

    window.remove_event_listener('popstate', @l_popstate)
  end

  def popstate()
    @bs_modal_images.hide()
  end

  def init_elm()
    template = """
<div class='modal fade' id='adminImagesModal' tabindex='-1' aria-labelledby='adminImagesModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='adminImagesModalLabel'>Nahrání obrázku</h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div id='adminImagesModalBody' class='modal-body'>
        <div class='mb-3'>
          <label for='adminImagesModalFileName' class='form-label'>Název:</label>
          <input type='text' id='adminImagesModalFileName' class='form-control' data-button-id='adminImagesModalBtnSave' placeholder='Zadejte název'>
          <div id='adminImagesModalFileNameFeedback' class='invalid-feedback'>
            Zadaný název je nesprávný.
          </div>
        </div>

        <div class='mb-3'>
          <label for='adminImagesModalFileDescription' class='form-label'>Popis:</label>
          <input type='text' id='adminImagesModalFileDescription' class='form-control' data-button-id='adminImagesModalBtnSave' placeholder='Zadejte popis'>
          <div id='adminImagesModalFileDescriptionFeedback' class='invalid-feedback'>
            Zadaný popis je nesprávný.
          </div>
        </div>
      </div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Zavřít</button>
        <button id='adminImagesModalBtnSave' type='button' class='btn btn-success' onclick='adminImagesModalBtnSaveClick()'>Uložit a pokračovat</button>
      </div>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end