import 'CContents', '../../../components/admin/analytics/elm-char-bar-modal/contents'
import 'CInputs', '../../../components/admin/analytics/elm-char-bar-modal/inputs'

export default class ElmAdminAnalyticsCharBarModal < HTMLElement
  attr_reader :c_contents

  def initialize
    super

    @l_popstate = lambda { popstate() }
    
    init_elm()

    @c_contents = CContents.new(self)
    @c_inputs   = CInputs.new(self)
  end

  def connected_callback()
    window.add_event_listener('popstate', @l_popstate)
    @c_inputs.connected_callback()
  end

  def disconnected_callback()
    window.remove_event_listener('popstate', @l_popstate)
    @c_inputs.disconnected_callback()
  end

  def popstate()
    @c_contents.bs_modal_char_bar.hide()
  end

  def init_elm()
    template = """
<div class='modal fade' id='adminAnalyticsCharBarModal' tabindex='-1' aria-labelledby='adminAnalyticsCharBarModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='adminAnalyticsCharBarModalLabel'>Články od 00:00</h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div id='adminAnalyticsCharBarModalBody' class='modal-body'></div>
      <div id='adminAnalyticsCharBarModalFooter' class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Zavřít</button>
      </div>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end