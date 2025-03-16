import CDatabase from "../../components/admin/elm-analytics/database";
import CContents from "../../components/admin/elm-analytics/contents";
import ElmSettings from "../../packages/bef-client-rjs-0.1.1/elements/elm_settings";
import ElmPagination from "../elm_pagination";

export default class ElmAdminAnalytics extends HTMLElement {
  constructor() {
    super();
    this._hCategoryClick = e => this.categoryClick(e.detail.value);

    this._hPaginationArticlesClick = e => (
      this.paginationArticlesClick(e.detail.value)
    );

    this._articleContainers = null;
    this.initElm();
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this)
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

    return this.updateElements()
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    );

    return Events.disconnect(
      this._cContents.elmArticlePaginations,
      ElmPagination.ENVS.click,
      this._hPaginationArticlesClick
    )
  };

  paginationArticlesClick(idContainer) {
    return this._cContents.udpateTbodyArticles(this._articleContainers[idContainer])
  };

  categoryClick(index) {
    if (index !== "analytics") return;
    return this.updateElements()
  };

  updateElements() {
    this._cContents.updateTime();

    this._cDatabase.getCountArticles((articles) => {
      this._articleContainers = articles.divideIntoGroups(ElmAdminAnalytics.NUMERUS_MAXIMUS);

      return Events.emit(
        this._cContents.elmArticlePaginations,
        ElmPagination.ENVS.init,
        this._articleContainers.length
      )
    });

    this._cDatabase.getCountReferrer(refferer => (
      this._cContents.udpateTbodyReferrer(refferer)
    ));

    return this._cDatabase.getCountDevices(devices => (
      this._cContents.udpateTbodyDevices(devices)
    ))
  };

  initElm() {
    let template = `${`
<div class='container mt-5'>
  <div class='text-center'>
    <h1>Analýza článků</h1>
    <p id='analyticsTime'>~~~</p>
  </div>

  <div class='mt-3 row d-flex justify-content-center'>
    <div class='col-md-6 col-lg-4 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Název článku</th>
                <th scope='col' class='text-end' title='uživatelé / celek'>Zobrazení</th>
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
    </div>

    <div class='col-md-6 col-lg-4 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Zdroj relace</th>
                <th scope='col' class='text-end'>Návštěvy</th>
              </tr>
            </thead>
            <tbody id='analyticsReferrerTBody'>
              <tr>
                <td class='text-center'>~~~</td>
                <td class='text-center'>~~~</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class='col-md-6 col-lg-4 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Zdroj zařízení</th>
                <th scope='col' class='text-end'>Použití</th>
              </tr>
            </thead>
            <tbody id='analyticsDevicesTBody'>
              <tr>
                <td class='text-center'>~~~</td>
                <td class='text-center'>~~~</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmAdminAnalytics.NUMERUS_MAXIMUS = 5