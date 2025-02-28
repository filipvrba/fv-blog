export default class ElmArticlesFooter extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    window.articlesFooterGoUp = this.goUp.bind(this)
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

  initElm() {
    let template = `${`
<footer class='text-body-secondary mt-auto' data-bs-theme='dark'>
  <div class='text-bg-dark py-4'>
    <div class='container d-flex justify-content-between align-items-center'>
      <p class='mb-0'>&copy; 2025 Filip Vrba - Blog | Všechna práva vyhrazena</p>
      <button class='btn btn-outline-light rounded-pill px-3' onclick='articlesFooterGoUp()'>
        <i class='bi bi-arrow-up-circle'></i> Posunout nahoru
      </button>
    </div>
  </div>
</footer>
    `}`;
    return this.innerHTML = template
  }
}