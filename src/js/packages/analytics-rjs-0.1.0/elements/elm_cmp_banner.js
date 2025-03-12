export default class ElmCmpBanner extends HTMLElement {
  constructor() {
    super();

    this._hAcceptCookiesClick = () => {
      return this.acceptAllCookies()
    };

    this._timeoutId = null;
    this.initElm()
  };

  connectedCallback() {
    this._acceptCookies.addEventListener(
      "click",
      this._hAcceptCookiesClick
    );

    return this.showBanner()
  };

  disconnectedCallback() {
    this._acceptCookies.removeEventListener(
      "click",
      this._hAcceptCookiesClick
    );

    if (this._timeoutId) return clearTimeout(this._timeoutId)
  };

  languageChange() {
    this._words = Language.relevant.cmpBanner;
    return this._words
  };

  showBanner() {
    if (!CMP.getConsent()) {
      this._cmpBanner.classList.remove("d-none");

      // Animation
      this._timeoutId = setTimeout(
        () => this._cmpBanner.classList.add("show"),
        500
      );

      return this._timeoutId
    }
  };

  hideBanner() {
    this._cmpBanner.classList.remove("show");

    // Animation
    this._timeoutId = setTimeout(
      () => this._cmpBanner.classList.add("d-none"),
      500
    );

    return this._timeoutId
  };

  acceptAllCookies() {
    CMP.setAllConsent();
    return this.hideBanner()
  };

  initElm() {
    this.languageChange();
    let template = `${`
<div id='cmp-banner' class='d-none'>
  <div class='container'>
    <h5>Základní ponaučení</h5>
    <p>Tento web používá základní analýzu dat. <strong>Používáním stránek souhlasíte s tím, že jste se seznámili s mými podmínkami.</strong> Rád bych zdůraznil, že veškeré <strong>informace na tomto blogu nesmějí být šířeny bez mého výslovného souhlasu!</strong> Prosím, respektujte autorská práva a související <a href='?aid=3#article'>podmínky</a>.</p>
    <div class='cmp-options'>
      <button class='btn btn-success btn-sm' id='accept-cookies'>Ano, rozumím</button>
    </div>
  </div>
</div>
    `}`;
    this.innerHTML = template;
    this._cmpBanner = this.querySelector("#cmp-banner");
    this._acceptCookies = this.querySelector("#accept-cookies");
    return this._acceptCookies
  }
}