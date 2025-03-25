export default class CInputs
  def initialize(parent)
    @parent = parent

    @h_subscribe_form_email_keypress = lambda { subscribe_form_email_keypress() }

    @subscribe_form_email = @parent.query_selector('#subscribeFormEmail')
    @subscribe_form_btn = @parent.query_selector('#subscribeFormBtn')

    window.subscribe_form_btn_click = subscribe_form_btn_click
  end

  def connected_callback()
    @subscribe_form_email.add_event_listener('keypress', @h_subscribe_form_email_keypress)
  end

  def disconnected_callback()
    @subscribe_form_email.remove_event_listener('keypress', @h_subscribe_form_email_keypress)
  end

  def subscribe_form_btn_click()
    is_subscribe_form_email = have_subscribe_form_email()

    Bootstrap.change_valid_element(@subscribe_form_email, is_subscribe_form_email)

    unless is_subscribe_form_email
      return
    end

    @parent.btn_click(@subscribe_form_email.value)
  end
  
  def subscribe_form_email_keypress()
    return unless event.key == 'Enter'

    @subscribe_form_btn.click()
  end
  
  def have_subscribe_form_email()
    email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

    @subscribe_form_email.value.length > 0 &&
      email_regex.test(@subscribe_form_email.value)
  end

  def clear_value()
    @subscribe_form_email.value = ''
  end
end
