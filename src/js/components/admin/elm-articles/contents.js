export default class CContents {
  get tBody() {
    return this._tBody
  };

  get elmArticlePaginations() {
    return this._elmArticlePaginations
  };

  constructor(parent) {
    this._parent = parent;
    this._tBody = this._parent.querySelector("#adminArticlesTBody");
    this._elmArticlePaginations = this._parent.querySelector("#adminArticlesTablePagination")
  };

  gotoArticle(articleId="") {
    return this._parent.innerHTML = `<elm-admin-article user-id='${this._parent.userId}' article-id='${articleId}'></elm-admin-article>`
  };

  publishedIcons(isPublished) {
    if (isPublished) {
      return "<i class='bi bi-eye-fill text-success'></i>"
    } else {
      return "<i class='bi bi-eye-slash-fill text-warning'></i>"
    }
  };

  templateArticle(article) {
    return `${`
    <tr class='anim-table'>
      <th class='hide-on-mobile' scope='row'>${article.id}</th>
      <td class='pointer' onclick='adminArticlesDropdownBtnEditClick(${article.id})'>${article.title}</td>
      <td class='hide-on-mobile'>${article.category}</td>
      <td class='pointer text-center hide-on-mobile' onclick='adminArticlesBtnShowClick(${article.id}, ${article.isPublished})' >${this.publishedIcons(article.isPublished)}</td>
      <td>
        <div class='form-check form-check-reverse mx-5'>
          <input id='adminArticlesCheck-${article.id}-${article.isPublished ? 1 : 0}' class='form-check-input' type='checkbox'>
        </div>
      </td>
    </tr>
    `}`
  };

  updateTable(articles) {
    let elements = [];

    if (articles) {
      for (let article of articles) {
        let template = this.templateArticle(article);
        elements.push(template)
      }
    } else {
      let emptyTemaplate = `${`
      <tr>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center'>---</td>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center'>---</td>
      </tr>
      `}`;
      elements.push(emptyTemaplate)
    };

    return this._tBody.innerHTML = elements.join("")
  }
}