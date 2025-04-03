import CContents from "../../../components/admin/analytics/elm-articles/contents";
import CDatabase from "../../../components/admin/analytics/elm-articles/database";
import ElmSettings from "../../../packages/bef-client-rjs-0.1.1/elements/elm_settings";
import ElmPagination from "../../elm_pagination";
import ElmAdminAnalyticsFilter from "./elm_filter";

export default class ElmAdminAnalyticsArticles extends HTMLElement {
  get hour() {
    return this._hour
  };

  get filterDate() {
    return this._filterDate
  };

  constructor() {
    super();
    this._hCategoryClick = e => this.categoryClick(e.detail.value);

    this._hPaginationArticlesClick = e => (
      this.paginationArticlesClick(e.detail.value)
    );

    this._hFilterActive = e => this.filterActive(e.detail.value);
    this._hour = this.getAttribute("hour") || null;
    this._filterDate = this.getAttribute("filter-date") || null;
    this._articleContainers = null;
    this.initElm();
    this._cContents = new CContents(this);
    this._cDatabase = new CDatabase(this)
  };

  connectedCallback() {
    Events.connect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    );

    Events.connect(
      this._cContents.elmArticlePaginations,
      ElmPagination.ENVS.click,
      this._hPaginationArticlesClick
    );

    Events.connect(
      "#app",
      ElmAdminAnalyticsFilter.ENVS.active,
      this._hFilterActive
    );

    return this.updateElements()
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    );

    Events.disconnect(
      this._cContents.elmArticlePaginations,
      ElmPagination.ENVS.click,
      this._hPaginationArticlesClick
    );

    return Events.disconnect(
      "#app",
      ElmAdminAnalyticsFilter.ENVS.active,
      this._hFilterActive
    )
  };

  categoryClick(index) {
    if (index !== "analytics") return;
    if (!this._hour) return this.updateElements()
  };

  paginationArticlesClick(idContainer) {
    return this._cContents.udpateTbodyArticles(this._articleContainers[idContainer])
  };

  filterActive(date) {
    if (!this._hour) {
      this._filterDate = date;
      return this.updateElements()
    }
  };

  updateElements() {
    return this._cDatabase.getCountArticles((articles) => {
      this._articleContainers = articles.divideIntoGroups(ElmAdminAnalyticsArticles.NUMERUS_MAXIMUS);

      return Events.emit(
        this._cContents.elmArticlePaginations,
        ElmPagination.ENVS.init,
        this._articleContainers.length
      )
    })
  };

  initElm() {
    let countsTitle = this._hour ? "" : "title='uživatelé / celek'";
    let template = `${`
<div class='card anim-card shadow-sm h-100 overflow-hidden'>
  <div class='card-body'>
    <table class='table'>
      <thead>
        <tr>
          <th scope='col'>Název článku</th>
          <th scope='col' class='text-end' ${countsTitle}>Zobrazení</th>
        </tr>
      </thead>
      <tbody id='analyticsArtcilesTBody'>
        <tr>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
        </tr>
      </tbody>
    </table>
  </div>

  <elm-pagination id='adminAnalyticsArticlesPagination' class='mb-2' centered></elm-pagination>
</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmAdminAnalyticsArticles.NUMERUS_MAXIMUS = 5