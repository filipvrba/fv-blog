import 'CInputs', '../components/elm-alert-modal/inputs'

export default class ElmAlertModal < HTMLElement
  attr_reader   :default_options, :bs_modal_alert
  attr_accessor :options

  def initialize
    super

    @l_popstate = lambda { popstate() }

    @default_options = {
      title: "<i class='bi bi-info-circle'></i> Informace",
      message: '<p>Byla provedena daná akce.</p>',
      fn_true: nil,
    }
    @options = structured_clone(@default_options)
    
    init_elm()

    modal_alert     = self.query_selector('#alertModal')
    @bs_modal_alert = bootstrap.Modal.new(modal_alert)

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
    @bs_modal_alert.hide()
  end

  def init_elm()
    template = """
<div class='modal fade' id='alertModal' tabindex='-1' aria-labelledby='alertModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='alertModalLabel'></h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div id='alertModalMessage' class='modal-body'></div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal' onclick='alertModalCloseBtnClick()'>Zavřít</button>
      </div>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end