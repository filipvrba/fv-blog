import CInputs from "../../components/admin/elm-images/inputs";
import CDatabase from "../../components/admin/elm-images/database";

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

  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._imageCompressor = new ImageCompressor(1_280, 720);
    this._cInputs = new CInputs(this);
    this._cDatabase = new CDatabase(this)
  };

  connectedCallback() {
    return this._cInputs.connectedCallback()
  };

  disconnectedCallback() {
    return this._cInputs.disconnectedCallback()
  };

  initElm() {
    let template = `${`
<input type='file' id='adminImagesUploadFileInput' style='display: none;'>
<div class='container mt-5'>
  <h1 class='text-center'>Správa obrázků</h1>
  <table class='table' id='adminImagesTable'>
    <thead>
      <tr>
        <th scope='col'></th>
        <th scope='col'>Název</th>
        <th id='thSize' scope='col'>Velikost</th>
        <th scope='col' class='text-end'>
          <div class='dropdown' >
            <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
              <i class='bi bi-gear'></i>
              Akce
            </button>
            <ul class='dropdown-menu' >
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
    <tbody id='adminImagesImagesTBody'>
      <tr>
        <td class='text-center'>---</td>
        <td class='text-center'>---</td>
        <td class='text-center'>---</td>
        <td class='text-center'>---</td>
      </tr>
    </tbody>
  </table>
</div>
    `}`;
    return this.innerHTML = template
  }
}