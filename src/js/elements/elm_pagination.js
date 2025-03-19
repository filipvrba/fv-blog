export default class ElmPagination extends HTMLElement {
  constructor() {
    super();

    this._hPreviousClick = () => {
      return this.btnPreviousClick()
    };

    this._hNextClick = () => {
      return this.btnNextClick()
    };

    this._hInitElm = (e) => {
      this._containerLength = e.detail.value;

      if (this._urlNameIndex) {
        this._containerIndex = Math.min(
          URLParams.getIndex(this._urlNameIndex),
          this._containerLength - 1
        )
      } else {
        this._containerIndex = 0
      };

      this.initElm();
      this._btnPrevious = this.querySelector("#paginationBtnPrevious");
      this._btnNext = this.querySelector("#paginationBtnNext");
      Events.connect(this._btnPrevious, "click", this._hPreviousClick);
      Events.connect(this._btnNext, "click", this._hNextClick);
      return this.updateDial()
    };

    this._urlNameIndex = this.getAttribute("name-index") || null;
    this._isCenter = this.getAttribute("centered") === "" || false;
    this._containerLength = null;
    this._containerIndex = null
  };

  connectedCallback() {
    return Events.connect(this, ElmPagination.ENVS.init, this._hInitElm)
  };

  disconnectedCallback() {
    Events.disconnect(this, ElmPagination.ENVS.init, this._hInitElm);

    if (this._btnPrevious) {
      Events.connect(this._btnPrevious, "click", this._hPreviousClick)
    };

    if (this._btnNext) {
      return Events.connect(this._btnNext, "click", this._hNextClick)
    }
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
    Events.emit(this, ElmPagination.ENVS.click, this._containerIndex);

    if (this._urlNameIndex) {
      return URLParams.set(this._urlNameIndex, this._containerIndex)
    }
  };

  initElm() {
    let template = `${`
<nav class='d-flex align-items-center ${this._isCenter ? "justify-content-center" : null} ${this._containerLength <= 1 ? "d-none" : null} mt-2'>
  <button id='paginationBtnPrevious' class='btn btn-outline-secondary rounded-pill'>Novější</button>
  <span id='paginationDial' class='mx-3'></span>
  <button id='paginationBtnNext' class='btn btn-outline-secondary rounded-pill'>Starší</button>
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