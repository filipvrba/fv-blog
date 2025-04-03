import CDatabase from "../../../components/admin/analytics/elm-char-bar/database";
import CContents from "../../../components/admin/analytics/elm-char-bar/contents";
import ElmSettings from "../../../packages/bef-client-rjs-0.1.1/elements/elm_settings";
import ElmAdminAnalyticsFilter from "./elm_filter";

export default class ElmAdminAnalyticsChartBar extends HTMLElement {
  get filterDate() {
    return this._filterDate
  };

  get cDatabase() {
    return this._cDatabase
  };

  constructor() {
    super();
    this._hCategoryClick = e => this.categoryClick(e.detail.value);
    this._hFilterActive = e => this.filterActive(e.detail.value);
    this._filterDate = null;
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
      "#app",
      ElmAdminAnalyticsFilter.ENVS.active,
      this._hFilterActive
    );

    return this.updateElm()
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    );

    return Events.disconnect(
      "#app",
      ElmAdminAnalyticsFilter.ENVS.active,
      this._hFilterActive
    )
  };

  categoryClick(index) {
    if (index !== "analytics") return;
    return this.updateElm()
  };

  filterActive(date) {
    this._filterDate = date;
    return this.updateElm()
  };

  updateElm() {
    return this._cDatabase.clicksPerHour((rows) => {
      let data = this._cDatabase.charData(rows);
      return this._cContents.renderChart(data)
    })
  };

  initElm() {
    let template = `${`
<div id='chart-container'>
  <canvas id='adminAnalyticsChartBarCanvas'></canvas>
</div>
    `}`;
    return this.innerHTML = template
  }
}