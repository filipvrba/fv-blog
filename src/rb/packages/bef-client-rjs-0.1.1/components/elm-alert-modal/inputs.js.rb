export default class CInputs
  ENVS = {
    show: 'eam-show-0'
  }

  def initialize(parent)
    @parent = parent
    @h_show = lambda {|e| show(e.detail.value)}

    @elm_label   = @parent.query_selector('#alertModalLabel')
    @elm_message = @parent.query_selector('#alertModalMessage')

    window.alert_modal_close_btn_click  = alert_modal_close_btn_click
  end

  def connected_callback()
    Events.connect('#app', ENVS.show, @h_show)
  end

  def disconnected_callback()
    Events.disconnect('#app', ENVS.show, @h_show)
  end

  def show(options)
    if @parent.bs_modal_alert._is_shown
      return
    end

    @parent.options.title = options.title ? options.title : @parent.default_options.title
    @parent.options.message = options.message ? options.message : @parent.default_options.message
    @parent.options.fn_true = options.fn_true ? options.fn_true : @parent.default_options.fn_true

    @elm_label.innerHTML   = @parent.options.title
    @elm_message.innerHTML = @parent.options.message

    @parent.bs_modal_alert.show()
  end

  def alert_modal_close_btn_click()
    @parent.options.fn_true.call() if @parent.options.fn_true
  end
end