export default class CBadge {
  constructor(parent) {
    this._parent = parent;
    this._elmBadge = this._parent.querySelector("#eaasFilterBadge");
    this.updateActive(null)
  };

  updateActive(date) {
    let isActive = date ? true : false;
    return Bootstrap.changeVisibleElement(this._elmBadge, isActive)
  }
}