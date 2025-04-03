import CInputs from "../../../components/admin/analytics/elm-filter/inputs";
import CBadge from "../../../components/admin/analytics/elm-filter/badge";

export default class ElmAdminAnalyticsFilter extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    this._cInputs = new CInputs(this);
    this._cBadge = new CBadge(this)
  };

  emitState(filterIndex) {
    let date = DateUtils.subtractTimeUTC(filterIndex);
    this._cBadge.updateActive(date);
    return Events.emit("#app", ElmAdminAnalyticsFilter.ENVS.active, date)
  };

  initElm() {
    let template = `${`
<div class='dropdown'>
  <button class='btn dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
    Filtr
    <span id='eaasFilterBadge' class='position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle'>
      <span class='visually-hidden'>New alerts</span>
    </span>
  </button>
  <ul class='dropdown-menu'>
    <li><button class='dropdown-item active' onclick='adminAnalyticsFilterBtnClick(0)'>Žádný</button></li>
    <li><button class='dropdown-item' onclick='adminAnalyticsFilterBtnClick(1)'>Dnes</button></li>
    <li><button class='dropdown-item' onclick='adminAnalyticsFilterBtnClick(2)'>Týden</button></li>
    <li><button class='dropdown-item' onclick='adminAnalyticsFilterBtnClick(3)'>Měsíc</button></li>
  </ul>
</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmAdminAnalyticsFilter.ENVS = {active: "eaasf-active-0"}