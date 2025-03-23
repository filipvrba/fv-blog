export default class CInputs
  ENVS = {
    show: 'eaaschbm-show-0'
  }

  def initialize(parent)
    @parent = parent
    @h_show = lambda {|e| show(e.detail.value) }
  end

  def connected_callback()
    Events.connect('#app', ENVS.show, @h_show)
  end

  def disconnected_callback()
    Events.disconnect('#app', ENVS.show, @h_show)
  end

  def show(hour)
    if @parent.c_contents.bs_modal_char_bar._is_shown
      return
    end

    @parent.c_contents.update_label(hour)
    @parent.c_contents.update_body(hour)

    @parent.c_contents.bs_modal_char_bar.show()
  end
end