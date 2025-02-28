export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._container = this._parent.querySelector("#articlesContainer")
  };

  updateContainer() {
    return this._parent.cDatabase.getAllArticles((articles) => {
      let elements = [];

      if (articles) {
        for (let article of articles) {
          let template = `${`
<div class='col-md-6 col-lg-4 mb-4'>
  <div class='card shadow-sm h-100'>
    <div class='card-img-top'>
      <div class='card border-0'>
        <elm-img-loader file-id='${article.fileId}'></elm-img-loader>
      </div>
    </div>
    <div class='card-body d-flex flex-column'>
      <h5 class='card-title'>
        <i class='bi bi-journal-text'></i>
        ${article.title}
      </h5>
      <p class='card-text'>${article.shortText}</p>

      <div class='mt-auto'>
        <div class='row g-0 align-items-center'>
          <div class='col-6'>
            <p class='card-text'>
              <small class='text-muted'>
                <i class='bi bi-tag-fill'></i>
                ${article.category}
              </small>
              <br>
              <small class='text-muted'>
                <i class='bi bi-calendar-fill'></i>
                ${article.createdAt}
              </small>
            </p>
          </div>

          <div class='col-6 text-center'>
            <a href='?aid=${article.id}#article' class='btn btn-secondary card-text'>
              <i class='bi bi-eye'></i>
              Podívat se
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
          `}`;
          elements.push(template)
        }
      };

      return this._container.innerHTML = elements.join("")
    })
  }
}