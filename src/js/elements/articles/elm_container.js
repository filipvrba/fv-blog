import ElmArticles from "../elm_articles";
import CContentsArticles from "../../components/elm-articles/contents";
import ElmPagination from "../elm_pagination";

export default class ElmArticlesContainer extends ElmArticles {
  constructor() {
    super();
    this._hPaginationClick = e => this.updateContainer(e.detail.value);
    this._articleContainers = null;
    this._idContainer = 0
  };

  connectedCallback() {
    Events.connect(
      "#app",
      ElmPagination.ENVS.click,
      this._hPaginationClick
    );

    return this.getAllArticlesAndEmit()
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      ElmPagination.ENVS.click,
      this._hPaginationClick
    );

    return super.disconnectedCallback()
  };

  updateContainer(idContainer) {
    this._idContainer = idContainer;

    if (this._articleContainers) {
      return this._cContents.updateContainer(this._articleContainers[idContainer])
    }
  };

  getAllArticlesAndEmit() {
    return this._cDatabase.getAllArticles((articles) => {
      this._articleContainers = articles.divideIntoGroups(ElmArticlesContainer.NUMERUS_MAXIMUS);

      return Events.emit(
        "#app",
        ElmPagination.ENVS.init,
        this._articleContainers.length
      )
    })
  };

  initElm() {
    let template = `${`\n    ${CContentsArticles.mainTemplate()}\n    <elm-pagination centered></elm-pagination>\n    `}`;
    return this.innerHTML = template
  }
};

ElmArticlesContainer.NUMERUS_MAXIMUS = 6