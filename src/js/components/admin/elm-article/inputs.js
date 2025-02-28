export default class CInputs {
  get adminArticleIdimage() {
    return this._adminArticleIdimage
  };

  get adminArticleCategory() {
    return this._adminArticleCategory
  };

  get adminArticleTitle() {
    return this._adminArticleTitle
  };

  get adminArticleText() {
    return this._adminArticleText
  };

  constructor(parent) {
    this._parent = parent;

    this._hAdminArticleIdimageKeypress = () => {
      return this.adminArticleIdimageKeypress()
    };

    this._hAdminArticleCategoryKeypress = () => {
      return this.adminArticleCategoryKeypress()
    };

    this._hAdminArticleTitleKeypress = () => {
      return this.adminArticleTitleKeypress()
    };

    this._hAdminArticleTextKeypress = () => adminArticleTextKeypress();
    this._adminArticleIdimage = this._parent.querySelector("#adminArticleIDImage");
    this._adminArticleCategory = this._parent.querySelector("#adminArticleCategory");
    this._adminArticleTitle = this._parent.querySelector("#adminArticleTitle");
    this._adminArticleText = this._parent.querySelector("#adminArticleText");
    this._adminArticleBtnSave = this._parent.querySelector("#adminArticleBtnSave");
    this._adminArticleBtnBack = this._parent.querySelector("#adminArticleBtnBack");
    window.adminArticleBtnSaveClick = this.adminArticleBtnSaveClick.bind(this);
    window.adminArticleBtnBackClick = this.adminArticleBtnBackClick.bind(this)
  };

  connectedCallback() {
    this._adminArticleIdimage.addEventListener(
      "keypress",
      this._hAdminArticleIdimageKeypress
    );

    this._adminArticleCategory.addEventListener(
      "keypress",
      this._hAdminArticleCategoryKeypress
    );

    return this._adminArticleTitle.addEventListener(
      "keypress",
      this._hAdminArticleTitleKeypress
    )
  };

  disconnectedCallback() {
    this._adminArticleIdimage.removeEventListener(
      "keypress",
      this._hAdminArticleIdimageKeypress
    );

    this._adminArticleCategory.removeEventListener(
      "keypress",
      this._hAdminArticleCategoryKeypress
    );

    return this._adminArticleTitle.removeEventListener(
      "keypress",
      this._hAdminArticleTitleKeypress
    )
  };

  adminArticleBtnSaveClick() {
    let isAdminArticleIdimage = this.haveAdminArticleIdimage();
    let isAdminArticleCategory = this.haveAdminArticleCategory();
    let isAdminArticleTitle = this.haveAdminArticleTitle();
    let isAdminArticleText = this.haveAdminArticleText();

    Bootstrap.changeValidElement(
      this._adminArticleIdimage,
      isAdminArticleIdimage
    );

    Bootstrap.changeValidElement(
      this._adminArticleCategory,
      isAdminArticleCategory
    );

    Bootstrap.changeValidElement(
      this._adminArticleTitle,
      isAdminArticleTitle
    );

    Bootstrap.changeValidElement(
      this._adminArticleText,
      isAdminArticleText
    );

    if (!isAdminArticleIdimage || !isAdminArticleCategory || !isAdminArticleTitle || !isAdminArticleText) {
      return
    };

    let fnTrue = () => (
      this._parent.btnSaveClick({
        imageId: this._adminArticleIdimage.value,
        category: this._adminArticleCategory.value,
        title: this._adminArticleTitle.value,
        text: this._adminArticleText.value
      })
    );

    return Modals.confirm({fnTrue})
  };

  adminArticleBtnBackClick() {
    return this._parent.cContents.gotoArticles()
  };

  adminArticleIdimageKeypress() {
    if (event.key !== "Enter") return;
    return this._adminArticleCategory.focus()
  };

  adminArticleCategoryKeypress() {
    if (event.key !== "Enter") return;
    return this._adminArticleTitle.focus()
  };

  adminArticleTitleKeypress() {
    if (event.key !== "Enter") return;
    return this._adminArticleText.focus()
  };

  haveAdminArticleIdimage() {
    return parseInt(this._adminArticleIdimage.value) >= 0
  };

  haveAdminArticleCategory() {
    return this._adminArticleCategory.value.length > 0
  };

  haveAdminArticleTitle() {
    return this._adminArticleTitle.value.length > 0
  };

  haveAdminArticleText() {
    return this._adminArticleText.value.length > 0
  }
}