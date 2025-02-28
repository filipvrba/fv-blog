export default class CContents {
  constructor(parent) {
    this._parent = parent
  };

  updateContainer() {
    return this._parent.cDatabase.getArtcile((article) => {
      let fnTrue, confirmOptions;

      if (article) {
        fnTrue = () => {
          let template = `${`
          <header class='row mx-3 d-flex justify-content-center'>
            <div class='card border-0 bg-transparent' style='max-width: 720px; max-height: 405px;'>
              <elm-img-loader rounded file-id='${article.fileId}' class='d-flex justify-content-center'></elm-img-loader>
            </div>
            <div class='text-center mt-3'>
              <h1 class='fw-bold'>${article.title}</h1>
              <p class='h4'>Publikováno: ${article.createdAt}</p>
            </div>
          </header>
          <article class='container text-break article mt-5'>
            ${article.fullText.mdToHtml()}
          </article>
          `}`;
          return this._parent.innerHTML = template
        };

        if (article.isAdult) {
          confirmOptions = {
            fnTrue,

            fnFalse() {
              return location.hash = "#"
            },

            message: `${`
            <div class='container'>
              <div class='text-center'>
                <!-- Ikona pro varování -->
                <i class='bi bi-exclamation-triangle-fill display-1 text-danger'></i>
                <h3 class='mt-3'>Tento článek obsahuje citlivý obsah</h3>
                <p class='lead'>Varování: Tento článek může obsahovat témata, která nejsou vhodná pro osoby mladší 18 let, včetně násilí, drog nebo znepokojivých myšlenek.</p>
                <p>Chcete dále pokračovat?</p>
              </div>
            </div>
            `}`
          };

          return Modals.confirm(confirmOptions)
        } else {
          return fnTrue.call()
        }
      } else {
        return this._parent.innerHTML = this.getNoArticle()
      }
    })
  };

  getNoArticle() {
    return `${`
<div class='container d-flex justify-content-center align-items-center'>
  <div class='text-center'>
    <i class='bi bi-slash-circle display-1 text-danger'></i>
    <h1 class='mt-3'>Chybějící článek</h1>
    <p class='lead'>Omlouváme se, článek neexistuje nebo byl smazán.</p>
  </div>
</div>
    `}`
  }
}