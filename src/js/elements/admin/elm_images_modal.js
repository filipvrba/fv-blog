import CInputs from "../../components/admin/elm-images-modal/inputs";
import CContents from "../../components/admin/elm-images-modal/contents";

export default class ElmAdminImagesModal extends HTMLElement {
  get bsModalImages() {
    return this._bsModalImages
  };

  get cContents() {
    return this._cContents
  };

  get cInputs() {
    return this._cInputs
  };

  constructor() {
    super();

    this._lPopstate = () => {
      return this.popstate()
    };

    this.initElm();
    let modalImages = this.querySelector("#adminImagesModal");
    this._bsModalImages = new bootstrap.Modal(modalImages);
    this._cInputs = new CInputs(this);
    this._cContents = new CContents(this)
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
    return this._bsModalImages.hide()
  };

  initElm() {
    let template = `${`
<div class='modal fade' id='adminImagesModal' tabindex='-1' aria-labelledby='adminImagesModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='adminImagesModalLabel'>Nahrání obrázku</h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div id='adminImagesModalBody' class='modal-body'>
        <div class='mb-3'>
          <label for='adminImagesModalFileName' class='form-label'>Název:</label>
          <input type='text' id='adminImagesModalFileName' class='form-control' data-button-id='adminImagesModalBtnSave' placeholder='Zadejte název'>
          <div id='adminImagesModalFileNameFeedback' class='invalid-feedback'>
            Zadaný název je nesprávný.
          </div>
        </div>

        <div class='mb-3'>
          <label for='adminImagesModalFileDescription' class='form-label'>Popis:</label>
          <input type='text' id='adminImagesModalFileDescription' class='form-control' data-button-id='adminImagesModalBtnSave' placeholder='Zadejte popis'>
          <div id='adminImagesModalFileDescriptionFeedback' class='invalid-feedback'>
            Zadaný popis je nesprávný.
          </div>
        </div>
      </div>
      <div id='adminImagesModalBodyTwo' class='modal-body'></div>
      <div id='adminImagesModalFooter' class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Zavřít</button>
        <button id='adminImagesModalBtnSave' type='button' class='btn btn-success' onclick='adminImagesModalBtnSaveClick()'>Uložit a pokračovat</button>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}