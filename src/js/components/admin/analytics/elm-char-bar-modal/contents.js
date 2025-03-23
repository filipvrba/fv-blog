export default class CContents {
  get bsModalCharBar() {
    return this._bsModalCharBar
  };

  constructor(parent) {
    this._parent = parent;
    let modalCharBar = this._parent.querySelector("#adminAnalyticsCharBarModal");
    this._bsModalCharBar = new bootstrap.Modal(modalCharBar);
    this._modalBody = this._parent.querySelector("#adminAnalyticsCharBarModalBody");
    this._modalLabel = this._parent.querySelector("#adminAnalyticsCharBarModalLabel")
  };

  updateLabel(hour) {
    return this._modalLabel.innerText = `Články od ${hour}`
  };

  updateBody(hour) {
    let template = `${`\n    <elm-admin-analytics-articles hour='${hour}'></elm-admin-analytics-articles>\n    `}`;
    return this._modalBody.innerHTML = template
  }
}