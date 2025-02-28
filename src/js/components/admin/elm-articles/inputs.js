export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    window.adminArticlesDropdownBtnNewClick = this.dropdownBtnNewClick.bind(this);
    window.adminArticlesDropdownBtnRemoveClick = this.dropdownBtnRemoveClick.bind(this);
    window.adminArticlesDropdownBtnEditClick = this.dropdownBtnEditClick.bind(this);
    window.adminArticlesDropdownBtnVisibilityClick = this.dropdownBtnVisibilityClick.bind(this);
    window.adminArticlesBtnShowClick = this.btnShowClick.bind(this)
  };

  dropdownBtnNewClick() {
    return this._parent.cContents.gotoArticle()
  };

  dropdownBtnVisibilityClick() {
    let elmArticles = Array.from(this._parent.cContents.tBody.querySelectorAll("[id^=\"adminArticlesCheck"));

    let infoArticles = elmArticles.map((article) => {
      let idSplit = article.id.split("-");

      return {
        articleId: idSplit[1],
        isPublished: idSplit[2] === (1).toString(),
        checked: article.checked
      }
    });

    let checkedArticles = infoArticles.filter(h => h.checked);
    if (checkedArticles.length <= 0) return;

    let fnTrue = () => {
      this._parent.setSpinnerVisibility(true);

      return this._parent.cDatabase.setVisibilityArticle(
        checkedArticles,

        (message) => {
          this._parent.setSpinnerVisibility(false);
          if (message) return this._parent.cContents.updateTable()
        }
      )
    };

    return Modals.confirm({fnTrue})
  };

  dropdownBtnRemoveClick() {
    let elmArticles = Array.from(this._parent.cContents.tBody.querySelectorAll("[id^=\"adminArticlesCheck"));

    let infoArticles = elmArticles.map(article => ({
      articleId: article.id.split("-")[1],
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
  };

  btnShowClick(articleId, isPublished) {
    return window.open(
      `/?aid=${articleId}&preview=${!isPublished}#article`,
      "_blank"
    )
  }
}