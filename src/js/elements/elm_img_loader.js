import CDatabase from "../components/elm-img-loader/database";

export default class ElmImgLoader extends HTMLElement {
  get fileId() {
    return this._fileId
  };

  constructor() {
    super();
    this._fileId = this.getAttribute("file-id") || null;
    this._isRounded = this.getAttribute("rounded") === "";
    this.initElm();
    this._cDatabase = new CDatabase(this)
  };

  connectedCallback() {
    let classRounded = this._isRounded ? "rounded-3" : "";

    return this._fileId ? this._cDatabase.getImage(image => (
      this.innerHTML = `<img src='${image.src}' class='img-fluid ${classRounded}' alt='${image.alt}'>`
    )) : this.innerHTML = `<img src='/imgs/no_img_01.jpg' class='img-fluid ${classRounded}' alt='No Image Available'>`
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = "<div style='height: 128px;'><elm-spinner class='spinner-overlay'></elm-spinner></div>";
    return this.innerHTML = template
  }
}