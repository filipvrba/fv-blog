import CContents from "../components/elm-articles/contents";
import CDatabase from "../components/elm-articles/database";
import CInputs from "../components/elm-articles/inputs";

export default class ElmArticles extends HTMLElement {
  get cDatabase() {
    return this._cDatabase
  };

  get cContents() {
    return this._cContents
  };

  constructor() {
    super();
    this.initElm();
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this);
    this._cInputs = new CInputs(this)
  };

  connectedCallback() {
    return this._cDatabase.getAllArticles(articles => (
      this._cContents.updateContainer(articles)
    ))
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    return this.innerHTML = CDatabase.mainTemplate()
  }
}