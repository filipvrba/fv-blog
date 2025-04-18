import CDatabase from "../../components/admin/elm-analytics/database";
import CContents from "../../components/admin/elm-analytics/contents";
import CPagination from "../../components/admin/elm-analytics/pagination";
import ElmSettings from "../../packages/bef-client-rjs-0.1.1/elements/elm_settings";
import ElmAdminAnalyticsFilter from "./analytics/elm_filter";

export default class ElmAdminAnalytics extends HTMLElement {
  get filterDate() {
    return this._filterDate
  };

  get cContents() {
    return this._cContents
  };

  constructor() {
    super();
    this._hCategoryClick = e => this.categoryClick(e.detail.value);
    this._hFilterActive = e => this.filterActive(e.detail.value);
    this.initElm();
    this._cDatabase = new CDatabase(this);
    this._cContents = new CContents(this);
    this._cPagination = new CPagination(this)
  };

  connectedCallback() {
    Events.connect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    );

    Events.connect(
      "#app",
      ElmAdminAnalyticsFilter.ENVS.active,
      this._hFilterActive
    );

    this._cPagination.connectedCallback();
    return this.updateElements()
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    );

    Events.disconnect(
      "#app",
      ElmAdminAnalyticsFilter.ENVS.active,
      this._hFilterActive
    );

    return this._cPagination.disconnectedCallback()
  };

  categoryClick(index) {
    if (index !== "analytics") return;
    return this.updateElements()
  };

  filterActive(date) {
    this._filterDate = date;
    return this.updateElements()
  };

  updateElements() {
    this._cContents.updateTime();

    this._cDatabase.getCountReferrer(refferer => (
      this._cPagination.setReferrerContainers(refferer)
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
    <div class='d-flex justify-content-center align-items-center gap-3'>
      <p id='analyticsTime' class='m-0'>~~~</p>
      <elm-admin-analytics-filter></elm-admin-analytics-filter>
    </div>
  </div>

  <div class='mt-3 row d-flex justify-content-center'>
    <div class='col-md-6 col-lg-4 mb-4'>
      <elm-admin-analytics-articles></elm-admin-analytics-articles>
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

        <elm-pagination id='adminAnalyticsReferrerPagination' class='mb-2' centered></elm-pagination>
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

    <div class='col-lg-10 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <elm-admin-analytics-chart-bar></elm-admin-analytics-chart-bar>
        </div>
      </div>
    </div>

  </div>

</div>
<elm-admin-analytics-char-bar-modal></elm-admin-analytics-char-bar-modal>
    `}`;
    return this.innerHTML = template
  }
}