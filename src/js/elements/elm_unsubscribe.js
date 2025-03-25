import CContents from "../components/elm-unsubscribe/contents";
import CDatabase from "../components/elm-unsubscribe/database";

export default class ElmUnsubscribe extends HTMLElement {
  get candidateId() {
    return this._candidateId
  };

  constructor() {
    super();
    this._candidateId = URLParams.getIndex("cid") || null;
    this._haveParams = this._candidateId && this._candidateId !== 0;
    this._cContents = new CContents(this);
    this._cDatabase = new CDatabase(this);
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initializeCandidate(candidate) {
    return this._cDatabase.removeCandidate(() => (
      this.innerHTML = this._cContents.getRemoveCandidate(candidate)
    ))
  };

  initElm() {
    this.innerHTML = "<elm-spinner class='spinner-overlay'></elm-spinner>";

    return this._haveParams ? this._cDatabase.getCandidate(candidate => (
      candidate ? this.initializeCandidate(candidate) : this.innerHTML = this._cContents.getNocandidate()
    )) : this.innerHTML = this._cContents.getNoparams()
  }
}