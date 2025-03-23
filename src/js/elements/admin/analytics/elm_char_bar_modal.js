import CContents from "../../../components/admin/analytics/elm-char-bar-modal/contents";
import CInputs from "../../../components/admin/analytics/elm-char-bar-modal/inputs";

export default class ElmAdminAnalyticsCharBarModal extends HTMLElement {
  get cContents() {
    return this._cContents
  };

  constructor() {
    super();

    this._lPopstate = () => {
      return this.popstate()
    };

    this.initElm();
    this._cContents = new CContents(this);
    this._cInputs = new CInputs(this)
  };

  connectedCallback() {
    window.addEventListener("popstate", this._lPopstate);
    return this._cInputs.connectedCallback()
  };

  disconnectedCallback() {
    window.removeEventListener("popstate", this._lPopstate);
    return this._cInputs.disconnectedCallback()
  };

  popstate() {
    return this._cContents.bsModalCharBar.hide()
  };

  initElm() {
    let template = `${`
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
    `}`;
    return this.innerHTML = template
  }
}