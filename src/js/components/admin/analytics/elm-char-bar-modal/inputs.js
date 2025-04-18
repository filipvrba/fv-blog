export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    this._hShow = e => this.show(e.detail.value)
  };

  connectedCallback() {
    return Events.connect("#app", CInputs.ENVS.show, this._hShow)
  };

  disconnectedCallback() {
    return Events.disconnect("#app", CInputs.ENVS.show, this._hShow)
  };

  show(options) {
    if (this._parent.cContents.bsModalCharBar._isShown) return;
    this._parent.cContents.updateLabel(options.hour);
    this._parent.cContents.updateBody(options);
    return this._parent.cContents.bsModalCharBar.show()
  }
};

CInputs.ENVS = {show: "eaaschbm-show-0"}