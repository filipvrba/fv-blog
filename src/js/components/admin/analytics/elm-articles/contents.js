export default class CContents {
  get elmArticlePaginations() {
    return this._elmArticlePaginations
  };

  constructor(parent) {
    this._parent = parent;
    this._artcilesTbody = this._parent.querySelector("#analyticsArtcilesTBody");
    this._elmArticlePaginations = this._parent.querySelector("#adminAnalyticsArticlesPagination")
  };

  emptyTr() {
    return `${`
    <tr>
      <td class='text-center'>---</td>
      <td class='text-center'>---</td>
    </tr>
    `}`
  };

  udpateTbodyArticles(articles) {
    let elements = [];

    if (articles) {
      for (let article of articles) {
        let conversionRateTitle = article.conversionRate ? `title='Konverzní poměr: ${article.conversionRate}'` : "";
        let counts = article.count ? `${article.count} / ${article.clickCount}` : article.clickCount;
        let template = `${`
        <tr>
          <td class='text-truncate' style='max-width: 200px;' title='${article.id} | ${article.title}'>${article.title}</td>
          <td class='text-end px-4' ${conversionRateTitle}>${counts}</td>
        </tr>
        `}`;
        elements.push(template)
      }
    } else {
      elements.push(this.emptyTr())
    };

    return this._artcilesTbody.innerHTML = elements.join("")
  }
}