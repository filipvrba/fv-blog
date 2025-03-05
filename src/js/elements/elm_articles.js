import CContents from "../components/elm-articles/contents";
import CDatabase from "../components/elm-articles/database";

export default class ElmArticles extends HTMLElement {
  get cDatabase() {
    return this._cDatabase
  };

  constructor() {
    super();
    this.initElm();
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this)
  };

  connectedCallback() {
    return this._cContents.updateContainer()
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
    <div id='articlesContainer' class='container row mx-auto'>
    
      <div class='d-flex justify-content-center align-items-center position-fixed top-50 start-50 translate-middle' style='z-index: 999;'>
        <div class='spinner-border' style='width: 5rem; height: 5rem;' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      </div>

    </div>
    `}`;
    return this.innerHTML = template
  }
}