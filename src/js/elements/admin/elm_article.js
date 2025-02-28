import CInputs from "../../components/admin/elm-article/inputs";
import CContents from "../../components/admin/elm-article/contents";
import CDatabase from "../../components/admin/elm-article/database";
import CSpinner from "../../packages/template-rjs-0.1.1/components/spinner";

export default class ElmAdminArticle extends HTMLElement {
  get userId() {
    return this._userId
  };

  get articleId() {
    return this._articleId
  };

  get cInputs() {
    return this._cInputs
  };

  get cContents() {
    return this._cContents
  };

  get cDatabase() {
    return this._cDatabase
  };

  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
    this._articleId = this.getAttribute("article-id") || null;
    this.initElm();
    this._cSpinner = new CSpinner(this);
    this._cInputs = new CInputs(this);
    this._cContents = new CContents(this);
    this._cDatabase = new CDatabase(this)
  };

  connectedCallback() {
    this._cInputs.connectedCallback();
    return this._cContents.updateContainer(this._articleId)
  };

  disconnectedCallback() {
    return this._cInputs.disconnectedCallback()
  };

  btnSaveClick(options) {
    this.setSpinnerVisibility(true);

    return this._articleId ? this._cDatabase.updateArticle(
      options,

      (message) => {
        this.setSpinnerVisibility(false);
        if (message) return this._cContents.gotoArticles()
      }
    ) : this._cDatabase.saveArticle(options, (message) => {
      this.setSpinnerVisibility(false);
      if (message) return this._cContents.gotoArticles()
    })
  };

  setSpinnerVisibility(isVisible) {
    return this._cSpinner.setDisplayWithId(
      isVisible,
      "#spinnerAdminArticle"
    )
  };

  initElm() {
    let template = `${`
<div class='container my-5'>
  <h1 class='text-center'>Správa článku</h1>
  <div class='card border-0 mt-4'>
    <elm-spinner id='spinnerAdminArticle' class='spinner-overlay'></elm-spinner>

    <div class='form-container'>

      <div class='col-md-6 mx-auto'>
        <div class='form-check form-switch mb-4'>
          <input class='form-check-input' type='checkbox' role='switch' id='adminArticleSwitchCheckAdult' data-button-id='adminArticleBtnSave'>
          <label class='form-check-label' for='adminArticleSwitchCheckAdult'>Povolit upozornění na věkovou omezenost</label>
        </div>
      </div>

      <div class='row g-3'>
        <div class='col-md-6'>
          <div class='mb-3'>
            <label for='adminArticleIDImage' class='form-label'>ID Obrázku</label>
            <input type='number' class='form-control' id='adminArticleIDImage' min='0' value='0' data-button-id='adminArticleBtnSave'>
          </div>
        </div>

        <div class='col-md-6'>
          <div class='mb-3'>
            <label for='adminArticleCategory' class='form-label'>Kategorie</label>
            <input type='text' class='form-control' id='adminArticleCategory' data-button-id='adminArticleBtnSave'>
          </div>
        </div>
      </div>
      <div class='mb-4'>
        <div class='mb-3'>
          <label for='adminArticleTitle' class='form-label'>Název</label>
          <input type='text' class='form-control' id='adminArticleTitle' data-button-id='adminArticleBtnSave'>
        </div>

        <div class='mb-3'>
          <div class='row'>
            <div class='col-6'>
              <label for='adminArticleText' class='form-label'>Text</label>
            </div>
            <div class='col-6 text-end'>
              <a class='navbar-brand' href='https://www.markdownguide.org/cheat-sheet/' target='_bland'>
                <i class='bi bi-info-circle'></i>
                MD Cheat Sheet
              </a>
            </div>
          </div>
          <textarea type='text' class='form-control' id='adminArticleText' style='height: 300px' data-button-id='adminArticleBtnSave'></textarea>
        </div>
      </div>
    </div>
    <div class='text-center'>
      <button class='btn btn-success' id='adminArticleBtnSave' onclick='adminArticleBtnSaveClick()'>Uložit</button>
      <button class='btn btn-secondary' id='adminArticleBtnBack' onclick='adminArticleBtnBackClick()'>Zpět</button>
    </div>
  <div>
<div>
    `}`;
    return this.innerHTML = template
  }
}