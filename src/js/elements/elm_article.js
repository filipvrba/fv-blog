import CDatabase from "../components/elm-article/database";
import CContents from "../components/elm-article/contents";

export default class ElmArticle extends HTMLElement {
  get articleId() {
    return this._articleId
  };

  get cDatabase() {
    return this._cDatabase
  };

  constructor() {
    super();
    this._articleId = URLParams.getIndex("aid") || 0;
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this)
  };

  connectedCallback() {
    return this._cContents.updateContainer()
  };

  disconnectedCallback() {
    return null
  }
}