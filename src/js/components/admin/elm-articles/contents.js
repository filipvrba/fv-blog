export default class CContents {
  get tBody() {
    return this._tBody
  };

  constructor(parent) {
    this._parent = parent;
    this._tBody = this._parent.querySelector("#adminArticlesTBody")
  };

  gotoArticle(articleId="") {
    return this._parent.innerHTML = `<elm-admin-article user-id='${this._parent.userId}' article-id='${articleId}'></elm-admin-article>`
  };

  templateArticle(article) {
    return `${`
    <tr>
      <th scope='row'>${article.id}</th>
      <td class='pointer' onclick='adminArticlesDropdownBtnEditClick(${article.id})'>${article.title}</td>
      <td>${article.category}</td>
      <td>
        <div class='form-check form-check-reverse mx-5'>
          <input id='adminArticlesCheck-${article.id}' class='form-check-input' type='checkbox'>
        </div>
      </td>
    </tr>
    `}`
  };

  updateTable() {
    this._parent.setSpinnerVisibility(true);

    return this._parent.cDatabase.getInfoArticles((articles) => {
      this._parent.setSpinnerVisibility(false);
      let elements = [];

      if (articles) {
        for (let article of articles) {
          let template = this.templateArticle(article);
          elements.push(template)
        }
      } else {
        let emptyTemaplate = `${`
        <tr>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
        </tr>
        `}`;
        elements.push(emptyTemaplate)
      };

      return this._tBody.innerHTML = elements.join("")
    })
  }
}