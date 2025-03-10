export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    window.articlesCardBtnClick = this.cardBtnClick.bind(this)
  };

  cardBtnClick(articleId) {
    URLParams.set("aid", articleId);
    return location.hash = "#article"
  }
}