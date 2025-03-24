import CInputs from "../components/elm-alert-modal/inputs";

export default class ElmAlertModal extends HTMLElement {
  get defaultOptions() {
    return this._defaultOptions
  };

  get bsModalAlert() {
    return this._bsModalAlert
  };

  get options() {
    return this._options
  };

  set options(options) {
    this._options = options
  };

  constructor() {
    super();

    this._lPopstate = () => {
      return this.popstate()
    };

    this._defaultOptions = {
      title: "<i class='bi bi-info-circle'></i> Informace",
      message: "<p>Byla provedena daná akce.</p>",
      fnTrue: null
    };

    this._options = structuredClone(this._defaultOptions);
    this.initElm();
    let modalAlert = this.querySelector("#alertModal");
    this._bsModalAlert = new bootstrap.Modal(modalAlert);
    this._cInputs = new CInputs(this)
  };

  connectedCallback() {
    this._cInputs.connectedCallback();
    return window.addEventListener("popstate", this._lPopstate)
  };

  disconnectedCallback() {
    this._cInputs.disconnectedCallback();
    return window.removeEventListener("popstate", this._lPopstate)
  };

  popstate() {
    return this._bsModalAlert.hide()
  };

  initElm() {
    let template = `${`
<div class='modal fade' id='alertModal' tabindex='-1' aria-labelledby='alertModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='alertModalLabel'></h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div id='alertModalMessage' class='modal-body'></div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal' onclick='alertModalCloseBtnClick()'>Zavřít</button>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}