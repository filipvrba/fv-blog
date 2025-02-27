import CDatabase from "../components/elm-img-loader/database";

export default class ElmImgLoader extends HTMLElement {
  get fileId() {
    return this._fileId
  };

  constructor() {
    super();
    this._fileId = this.getAttribute("file-id");
    this.initElm();
    this._cDatabase = new CDatabase(this)
  };

  connectedCallback() {
    return this._cDatabase.getImage(image => (
      this.innerHTML = `<img src='${image.src}' class='img-fluid' alt='${image.alt}'>`
    ))
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = "<div style='height: 128px;'><elm-spinner class='spinner-overlay'></elm-spinner></div>";
    return this.innerHTML = template
  }
}