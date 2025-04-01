import CDatabase from "../components/elm-article/database";
import CContents from "../components/elm-article/contents";
import CSeo from "../components/elm-article/seo";

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

  get cSeo() {
    return this._cSeo
  };

  constructor() {
    super();
    this._articleId = URLParams.getIndex("aid") || 0;
    this._isPreview = URLParams.get("preview") || "";
    this._isPreview = this._isPreview === "true";
    this._cSeo = new CSeo(this);
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this);
    this._cContents.updateContainer()
  };

  connectedCallback() {
    if (CMP.getConsent() !== "none") {
      this._cDatabase.sendLogVisit();
      return this._cDatabase.sendLogClick()
    }
  };

  disconnectedCallback() {
    return null
  }
}