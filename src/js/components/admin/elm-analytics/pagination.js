import ElmPagination from "../../../elements/elm_pagination";

export default class CPagination {
  constructor(parent) {
    this._parent = parent;

    this._hPaginationReferrerClick = e => (
      this.paginationReferrerClick(e.detail.value)
    );

    this._elmReferrerPagination = this._parent.querySelector("#adminAnalyticsReferrerPagination");
    this._referrerContainers = null
  };

  connectedCallback() {
    return Events.connect(
      this._elmReferrerPagination,
      ElmPagination.ENVS.click,
      this._hPaginationReferrerClick
    )
  };

  disconnectedCallback() {
    return Events.disconnect(
      this._elmReferrerPagination,
      ElmPagination.ENVS.click,
      this._hPaginationReferrerClick
    )
  };

  setReferrerContainers(referrer) {
    this._referrerContainers = referrer ? referrer.divideIntoGroups(CPagination.NUMERUS_MAXIMUS) : [];

    return Events.emit(
      this._elmReferrerPagination,
      ElmPagination.ENVS.init,
      this._referrerContainers.length
    )
  };

  paginationReferrerClick(idContainer) {
    return this._parent.cContents.udpateTbodyReferrer(this._referrerContainers[idContainer])
  }
};

CPagination.NUMERUS_MAXIMUS = 5