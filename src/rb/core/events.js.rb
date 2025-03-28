export default class Events
  def self.emit(dom, event, values = nil)
    custom_event = new CustomEvent(event, {
      detail: {
        value: values
      }
    })

    if dom.is_a?(String)
      document.query_selector(dom).dispatch_event(custom_event)
    else
      dom.dispatch_event(custom_event)
    end
  end

  def self.connect(dom, event, &callback)
    if dom.is_a?(String)
      document.query_selector(dom).add_event_listener(event, callback) if callback
    else
      dom.add_event_listener(event, callback) if callback
    end
  end

  def self.disconnect(dom, event, &callback)
    if dom.is_a?(String)
      document.query_selector(dom).remove_event_listener(event, callback) if callback
    else
      dom.remove_event_listener(event, callback) if callback
    end
  end
end
window.Events = Events
