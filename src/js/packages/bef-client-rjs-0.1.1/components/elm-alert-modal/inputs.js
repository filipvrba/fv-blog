export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    this._hShow = e => this.show(e.detail.value);
    this._elmLabel = this._parent.querySelector("#alertModalLabel");
    this._elmMessage = this._parent.querySelector("#alertModalMessage");
    window.alertModalCloseBtnClick = this.alertModalCloseBtnClick.bind(this)
  };

  connectedCallback() {
    return Events.connect("#app", CInputs.ENVS.show, this._hShow)
  };

  disconnectedCallback() {
    return Events.disconnect("#app", CInputs.ENVS.show, this._hShow)
  };

  show(options) {
    if (this._parent.bsModalAlert._isShown) return;
    this._parent.options.title = options.title ? options.title : this._parent.defaultOptions.title;
    this._parent.options.message = options.message ? options.message : this._parent.defaultOptions.message;
    this._parent.options.fnTrue = options.fnTrue ? options.fnTrue : this._parent.defaultOptions.fnTrue;
    this._elmLabel.innerHTML = this._parent.options.title;
    this._elmMessage.innerHTML = this._parent.options.message;
    return this._parent.bsModalAlert.show()
  };

  alertModalCloseBtnClick() {
    if (this._parent.options.fnTrue) return this._parent.options.fnTrue.call()
  }
};

CInputs.ENVS = {show: "eam-show-0"}