export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._parent.setSpinnerVisibility(false)
  };

  gotoArticles() {
    return this._parent.innerHTML = `<elm-admin-articles user-id='${this._parent.userId}'></elm-admin-articles>`
  };

  updateContainer() {
    if (!this._parent.articleId) return;
    this._parent.setSpinnerVisibility(true);

    return this._parent.cDatabase.getArticle((article) => {
      this._parent.setSpinnerVisibility(false);
      this._parent.cInputs.adminArticleSwitchCheckAdult.checked = article.isAdult;
      this._parent.cInputs.adminArticleIdimage.value = article.fileId;
      this._parent.cInputs.adminArticleCategory.value = article.category;
      this._parent.cInputs.adminArticleTitle.value = article.title;
      return this._parent.cInputs.adminArticleText.value = article.fullText
    })
  }
}