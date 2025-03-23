import CDatabase from "../../../components/admin/analytics/elm-char-bar/database";
import CContents from "../../../components/admin/analytics/elm-char-bar/contents";
import ElmSettings from "../../../packages/bef-client-rjs-0.1.1/elements/elm_settings";

export default class ElmAdminAnalyticsChartBar extends HTMLElement {
  get cDatabase() {
    return this._cDatabase
  };

  constructor() {
    super();
    this._hCategoryClick = e => this.categoryClick(e.detail.value);
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

    return this.updateElm()
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    )
  };

  categoryClick(index) {
    if (index !== "analytics") return;
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