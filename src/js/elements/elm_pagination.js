export default class ElmPagination extends HTMLElement {
  constructor() {
    super();

    this._hInitElm = (e) => {
      this._containerLength = e.detail.value;
      this.initElm();
      return this.updateDial()
    };

    this._isCenter = this.getAttribute("centered") === "" || false;
    this._containerLength = 0;
    this._containerIndex = 0;
    window.paginationBtnNextClick = this.btnNextClick.bind(this);
    window.paginationBtnPreviousClick = this.btnPreviousClick.bind(this)
  };

  connectedCallback() {
    return Events.connect(
      "#app",
      ElmPagination.ENVS.init,
      this._hInitElm
    )
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmPagination.ENVS.init,
      this._hInitElm
    )
  };

  btnNextClick() {
    if ((this._containerIndex + 1) >= this._containerLength) return;
    this._containerIndex++;
    return this.updateDial()
  };

  btnPreviousClick() {
    if ((this._containerIndex - 1) <= -1) return;
    this._containerIndex--;
    return this.updateDial()
  };

  emitClick() {
    return Events.emit(
      "#app",
      ElmPagination.ENVS.click,
      this._containerIndex
    )
  };

  initElm() {
    let template = `${`
<nav class='d-flex align-items-center ${this._isCenter ? "justify-content-center" : null} ${this._containerLength <= 1 ? "d-none" : null} mt-2'>
  <button class='btn btn-outline-primary rounded-pill' onclick='paginationBtnPreviousClick()'>Novější</button>
  <span id='paginationDial' class='mx-3'></span>
  <button class='btn btn-outline-secondary rounded-pill' onclick='paginationBtnNextClick()'>Starší</button>
</nav>
    `}`;
    return this.innerHTML = template
  };

  updateDial() {
    this.querySelector("#paginationDial").innerText = `${this._containerIndex + 1} / ${this._containerLength}`;
    return this.emitClick()
  }
};

ElmPagination.ENVS = {init: "eptn-init-0", click: "eptn-click-1"}