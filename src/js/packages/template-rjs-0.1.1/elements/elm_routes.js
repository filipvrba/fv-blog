export default class ElmRoutes extends HTMLElement {
  constructor() {
    super();

    this._lHashchange = () => {
      return this.changePage()
    };

    this._hLanguageChange = () => {
      return this.changePage()
    };

    this._hReloadRoute = () => {
      return this.changePage()
    };

    this.languageChange();
    this.changePage()
  };

  connectedCallback() {
    window.addEventListener("hashchange", this._lHashchange);

    Events.connect(
      "#app",
      Language.ENVS.languageChange,
      this._hLanguageChange
    );

    return Events.connect("#app", "reloadRoute", this._hReloadRoute)
  };

  disconnectedCallback() {
    window.removeEventListener("hashchange", this._lHashchange);

    Events.disconnect(
      "#app",
      Language.ENVS.languageChange,
      this._hLanguageChange
    );

    return Events.disconnect("#app", "reloadRoute", this._hReloadRoute)
  };

  languageChange() {
    this._language = Language.relevant.elmRoutes;
    return this._language
  };

  changePage() {
    this.languageChange();
    let currentPage = this.findCurrentPage();
    if (currentPage) return this.initPage(currentPage)
  };

  findCurrentPage() {
    for (let page of ROUTES_JSON.pages) {
      if (page.endpoint !== location.hash.replace("#", "").replaceAll(
        "-",
        "/"
      )) continue;

      return page
    };

    return null
  };

  initPage(page) {
    this.initMeta(page);
    let pageName = page.endpoint.replaceAll("-", "_");
    let content = PAGES[pageName];
    return this.initElm(content, page)
  };

  initElm(content, page=null) {
    let template = `${`\n    ${page ? content.replace(
      "TITLE",
      this._language.titles[page.endpoint]
    ) : null}\n    `}`;

    return this.innerHTML = template
  };

  initMeta(page) {
    let title = `${this._language.titles[page.endpoint]} | ${this._language.meta[0]}`;
    return document.title = title
  }
}