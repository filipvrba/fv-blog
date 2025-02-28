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
    let template = `${`\n    <div id='articlesContainer' class='container row mx-auto'>\n    </div>\n    `}`;
    return this.innerHTML = template
  }
}