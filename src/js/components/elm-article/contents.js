export default class CContents {
  constructor(parent) {
    this._parent = parent
  };

  updateContainer() {
    return this._parent.cDatabase.getArtcile((article) => {
      let template;

      if (article) {
        template = `${`
        <header class='mx-3'>
          <div class='card border-0 mx-auto' style='max-width: 720px; max-height: 405px;'>
            <elm-img-loader rounded file-id='${article.fileId}'></elm-img-loader>
          </div>
          <div class='text-center mt-3'>
            <h1 class='fw-bold'>${article.title}</h1>
            <p class='h4'>Publikováno: ${article.createdAt}</p>
          </div>
        </header>


<article class='container article mt-5'>
  ${article.fullText.mdToHtml()}
</article>
        `}`;
        return this._parent.innerHTML = template
      } else {
        return this._parent.innerHTML = this.getNoArticle()
      }
    })
  };

  getNoArticle() {
    return `${`
<div class='container'>
  <div class='text-center'>
    <i class='bi bi-slash-circle display-1 text-danger'></i>
    <h1 class='mt-3'>Chybějící článek</h1>
    <p class='lead'>Omlouváme se, článek neexistuje nebo byl smazán.</p>
  </div>
</div>
    `}`
  }
}