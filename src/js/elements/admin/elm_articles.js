import CInputs from "../../components/admin/elm-articles/inputs";
import CContents from "../../components/admin/elm-articles/contents";
import CDatabase from "../../components/admin/elm-articles/database";
import CSpinner from "../../packages/template-rjs-0.1.1/components/spinner";
import ElmPagination from "../elm_pagination";

export default class ElmAdminArticles extends HTMLElement {
  get userId() {
    return this._userId
  };

  get cContents() {
    return this._cContents
  };

  get cDatabase() {
    return this._cDatabase
  };

  constructor() {
    super();

    this._hPaginationArticlesClick = e => (
      this.paginationArticlesClick(e.detail.value)
    );

    this._userId = this.getAttribute("user-id");
    this._articleContainers = null;
    this.initElm();
    this._cSpinner = new CSpinner(this);
    this._cInputs = new CInputs(this);
    this._cContents = new CContents(this);
    this._cDatabase = new CDatabase(this)
  };

  connectedCallback() {
    Events.connect(
      this._cContents.elmArticlePaginations,
      ElmPagination.ENVS.click,
      this._hPaginationArticlesClick
    );

    return this.updateData()
  };

  disconnectedCallback() {
    return Events.disconnect(
      this._cContents.elmArticlePaginations,
      ElmPagination.ENVS.click,
      this._hPaginationArticlesClick
    )
  };

  updateData() {
    this.setSpinnerVisibility(true);

    return this._cDatabase.getInfoArticles((articles) => {
      this.setSpinnerVisibility(false);
      this._articleContainers = articles.divideIntoGroups(ElmAdminArticles.NUMERUS_MAXIMUS);

      return Events.emit(
        this._cContents.elmArticlePaginations,
        ElmPagination.ENVS.init,
        this._articleContainers.length
      )
    })
  };

  paginationArticlesClick(idContainer) {
    return this._cContents.updateTable(this._articleContainers[idContainer])
  };

  setSpinnerVisibility(isVisible) {
    return this._cSpinner.setDisplayWithId(
      isVisible,
      "#spinnerAdminArticles"
    )
  };

  initElm() {
    let template = `${`
<div class='container mt-5'>
  <h1 class='text-center'>Správa článků</h1>
  <div class='card border-0'>
    <elm-spinner id='spinnerAdminArticles' class='spinner-overlay'></elm-spinner>

    <table class='table' id='adminArticlesTable'>
      <thead>
        <tr>
          <th scope='col' class='hide-on-mobile'></th>
          <th scope='col'>Název</th>
          <th scope='col' class='hide-on-mobile'>Kategorie</th>
          <th scope='col' class='hide-on-mobile'>Viditelnost</th>
          <th scope='col' class='text-end'>
            <div class='dropdown' >
              <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                <i class='bi bi-gear'></i>
                Akce
              </button>
              <ul class='dropdown-menu' >
                <li>
                  <button class='dropdown-item' onclick='adminArticlesDropdownBtnNewClick()'>Nový</button>
                </li>
                <li>
                  <button class='dropdown-item' onclick='adminArticlesDropdownBtnVisibilityClick()'>Upravit viditelnost</button>
                </li>
                <li>
                  <button class='dropdown-item' onclick='adminArticlesDropdownBtnRemoveClick()'>Odebrat</button>
                </li>
              </ul>
            </div>
          </th>
        </tr>
      </thead>
      <tbody id='adminArticlesTBody'>
        <tr>
          <td class='text-center hide-on-mobile'>~~~</td>
          <td class='text-center'>~~~</td>
          <td class='text-center hide-on-mobile'>~~~</td>
          <td class='text-center hide-on-mobile'>~~~</td>
          <td class='text-center'>~~~</td>
        </tr>
      </tbody>
    </table>
    <elm-pagination id='adminArticlesTablePagination' class='mb-4' centered></elm-pagination>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmAdminArticles.NUMERUS_MAXIMUS = 8