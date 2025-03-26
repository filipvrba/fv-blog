export default class ElmArticlesFooter extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    window.articlesFooterGoUp = this.goUp.bind(this);
    window.articlesFooterGoArticle = this.goArticle.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  goUp() {
    return window.scrollTo({top: 0, behavior: "smooth"})
  };

  goArticle(articleId=28) {
    URLParams.set("aid", articleId);
    location.hash = "#article";
    return Events.emit("#app", "reloadRoute")
  };

  initElm() {
    let template = `${`
<footer class='text-body-secondary mt-auto' data-bs-theme='dark'>
  <div class='text-bg-dark py-4'>
    <div class='container d-flex justify-content-between align-items-center'>
      <p class='mb-0'>&copy; 2025 Filip Vrba - Blog | Všechna práva vyhrazena</p>
      <button class='btn btn-outline-light rounded-pill px-3' onclick='articlesFooterGoArticle(28)'>
        <i class='bi bi-envelope'></i> Získávat nové články e-mailem
      </button>
    </div>
  </div>
</footer>
    `}`;
    return this.innerHTML = template
  }
}