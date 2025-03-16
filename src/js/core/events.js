export default class Events {
  static emit(dom, event, values=null) {
    let customEvent = new CustomEvent(event, {detail: {value: values}});
    return Object.prototype.toString.call(dom) === "[object String]" ? document.querySelector(dom).dispatchEvent(customEvent) : dom.dispatchEvent(customEvent)
  };

  static connect(dom, event, callback) {
    if (Object.prototype.toString.call(dom) === "[object String]") {
      if (callback) {
        return document.querySelector(dom).addEventListener(event, callback)
      }
    } else if (callback) {
      return dom.addEventListener(event, callback)
    }
  };

  static disconnect(dom, event, callback) {
    if (Object.prototype.toString.call(dom) === "[object String]") {
      if (callback) {
        return document.querySelector(dom).removeEventListener(
          event,
          callback
        )
      }
    } else if (callback) {
      return dom.removeEventListener(event, callback)
    }
  }
};

window.Events = Events