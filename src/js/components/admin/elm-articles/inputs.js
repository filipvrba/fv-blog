export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    window.adminArticlesDropdownBtnNewClick = this.dropdownBtnNewClick.bind(this);
    window.adminArticlesDropdownBtnRemoveClick = this.dropdownBtnRemoveClick.bind(this);
    window.adminArticlesDropdownBtnEditClick = this.dropdownBtnEditClick.bind(this)
  };

  dropdownBtnNewClick() {
    return this._parent.cContents.gotoArticle()
  };

  dropdownBtnRemoveClick() {
    let elmArticles = Array.from(this._parent.cContents.tBody.querySelectorAll("[id^=\"adminArticlesCheck"));

    let infoArticles = elmArticles.map(article => ({
      articleId: article.id.split("-")[article.id.split("-").length - 1],
      checked: article.checked
    }));

    let checkedArticles = infoArticles.filter(h => h.checked);
    if (checkedArticles.length <= 0) return;

    let fnTrue = () => {
      let idArticles = checkedArticles.map(h => parseInt(h.articleId));
      this._parent.setSpinnerVisibility(true);

      return this._parent.cDatabase.removeArticle(
        idArticles,

        (message) => {
          this._parent.setSpinnerVisibility(false);
          if (message) return this._parent.cContents.updateTable()
        }
      )
    };

    return Modals.confirm({fnTrue})
  };

  dropdownBtnEditClick(articleId) {
    return this._parent.cContents.gotoArticle(articleId)
  }
}