import CInputs from "../../components/admin/elm-images/inputs";
import CDatabase from "../../components/admin/elm-images/database";
import CProgress from "../../components/admin/elm-images/progress";
import CContents from "../../components/admin/elm-images/contents";
import CSpinner from "../../packages/template-rjs-0.1.1/components/spinner";
import CInputsAdminImagesModal from "../../components/admin/elm-images-modal/inputs";

export default class ElmAdminImages extends HTMLElement {
  get userId() {
    return this._userId
  };

  get imageCompressor() {
    return this._imageCompressor
  };

  get cDatabase() {
    return this._cDatabase
  };

  get cProgress() {
    return this._cProgress
  };

  get cContents() {
    return this._cContents
  };

  constructor() {
    super();
    this._hImagesModalSave = e => this.imagesModalSave(e.detail.value);
    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._imageCompressor = new ImageCompressor(1_280, 720);
    this._cSpinner = new CSpinner(this);
    this._cInputs = new CInputs(this);
    this._cDatabase = new CDatabase(this);
    this._cProgress = new CProgress(this);
    this._cContents = new CContents(this);
    this._cContents.updateTable()
  };

  connectedCallback() {
    this._cInputs.connectedCallback();

    return Events.connect(
      "#app",
      CInputsAdminImagesModal.ENVS.save,
      this._hImagesModalSave
    )
  };

  disconnectedCallback() {
    this._cInputs.disconnectedCallback();
    this._cProgress.disconnectedCallback();

    return Events.disconnect(
      "#app",
      CInputsAdminImagesModal.ENVS.save,
      this._hImagesModalSave
    )
  };

  imagesModalSave(options) {
    this._cInputs.uploadFileDetails = options;
    return this._cInputs.uploadFileInput.click()
  };

  setSpinnerVisibility(isVisible) {
    return this._cSpinner.setDisplayWithId(
      isVisible,
      "#spinnerAdminImages"
    )
  };

  initElm() {
    let template = `${`
<input type='file' id='adminImagesUploadFileInput' style='display: none;'>
<div class='container mt-5'>
  <h1 class='text-center'>Správa obrázků</h1>
  <div id='adminImagesProgress' class='progress' role='progressbar' aria-label='Example 1px high' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100' style='height: 1px'>
    <div class='progress-bar' style='width: 25%'></div>
  </div>
  <div class='card border-0'>
    <elm-spinner id='spinnerAdminImages' class='spinner-overlay'></elm-spinner>

    <table class='table' id='adminImagesTable'>
      <thead>
        <tr>
          <th scope='col'></th>
          <th scope='col'>Název</th>
          <th scope='col'>Popis</th>
          <th scope='col' class='text-end'>
            <div class='dropdown' >
              <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                <i class='bi bi-gear'></i>
                Akce
              </button>
              <ul class='dropdown-menu' >
                <li class='dropdown-header'>
                  Velikost: <span id='adminImagesDropdownHeaderSize'>0 MB</span>
                </li>
                <li>
                  <button class='dropdown-item' onclick='adminImagesDropdownBtnUploadClick()'>Nahrát</button>
                </li>
                <li>
                  <button class='dropdown-item' onclick='adminImagesDropdownBtnRemoveClick()'>Odebrat</button>
                </li>
              </ul>
            </div>
          </th>
        </tr>
      </thead>
      <tbody id='adminImagesTBody'>
        <tr>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<elm-admin-images-modal></elm-admin-images-modal>
    `}`;
    return this.innerHTML = template
  }
}