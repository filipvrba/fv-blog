import CInputs from "../../components/articles/elm-header/inputs";

export default class ElmHeader extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    this._cInputs = new CInputs()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<header data-bs-theme='dark'>
  <div class='collapse text-bg-dark' id='articleHeaderNavbar'>
    <div class='container'>
      <div class='row'>
        <div class='col-sm-8 col-md-7 py-4'>
          <h4>O blogu</h4>
          <p class='text-body-secondary'>Tento blog je mým osobním prostorem, kde sdílím své názory, myšlenky a postřehy k různým tématům. Každý článek odráží můj pohled na svět, a proto se může lišit od názorů ostatních. Pokud máte jiný názor nebo byste rádi diskutovali o nějakém tématu, neváhejte mi napsat osobně. Vaše názory jsou vítány.</p>
          <p class='text-body-secondary'>Rád bych také zdůraznil, že veškerý obsah na tomto blogu je mým vlastním dílem a nehodlám, aby se informace zde uvedené šířily bez mého výslovného souhlasu. Respektujte prosím autorská práva a související <a class='pointer' onclick='articlesFooterGoArticle(3)'>podmínky</a>.</p>
        </div>
        <div class='col-sm-4 offset-md-1 py-4'>
          <h4>Kontakty</h4>
          <ul class='list-unstyled'>
            <li><a href='https://filipvrba.vercel.app/#kontakty' class='text-white' target='_blank'>Osobní web</a></li>
            <li><a href='mailto:filipvrbaxi@gmail.com' class='text-white' target='_blank'>Poslat email</a></li>
          </ul>

          <h4 class='mt-5'>Přihlaste se k odběru novinek</h4>
          <p>Zaregistrujte se a buďte informováni o nejnovějších článcích.</p>
          <ul class='list-unstyled'>
            <li><a class='text-white pointer' onclick='articlesFooterGoArticle(28)'>Přihlásit se zde</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class='navbar navbar-dark bg-dark shadow-sm'>
    <div class='container'>
      <a href='#' class='navbar-brand d-flex align-items-center' onclick='articleHeaderLogoBtnClick()'>
        <img class='me-2' src='/favicon-32x32.png' alt='Favoicon Filip Vrba Blog'>
        <strong>Filip Vrba - Blog</strong>
      </a>
      <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#articleHeaderNavbar' aria-controls='articleHeaderNavbar' aria-expanded='false' aria-label='Toggle navigation'>
        <span class='navbar-toggler-icon'></span>
      </button>
    </div>
  </div>
</header>
    `}`;
    return this.innerHTML = template
  }
}