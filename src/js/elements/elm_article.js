import CDatabase from "../components/elm-article/database";
import CContents from "../components/elm-article/contents";

export default class ElmArticle extends HTMLElement {
  get articleId() {
    return this._articleId
  };

  get isPreview() {
    return this._isPreview
  };

  get cDatabase() {
    return this._cDatabase
  };

  constructor() {
    super();
    this._articleId = URLParams.getIndex("aid") || 0;
    this._isPreview = URLParams.get("preview") || "";
    this._isPreview = this._isPreview === "true";
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this)
  };

  connectedCallback() {
    this._cContents.updateContainer();
    if (CMP.getConsent() !== "none") return this._cDatabase.sendLogVisit()
  };

  disconnectedCallback() {
    return null
  }
}