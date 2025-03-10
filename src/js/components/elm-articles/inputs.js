export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    window.articlesCardBtnClick = this.cardBtnClick.bind(this)
  };

  cardBtnClick(articleId) {
    URLParams.set("aid", articleId);
    URLParams.remove("preview");
    return location.hash = "#article"
  }
}