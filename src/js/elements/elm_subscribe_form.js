import CInputs from "../components/elm-subscribe-form/inputs";
import CDatabase from "../components/elm-subscribe-form/database";
import CSpinner from "../packages/template-rjs-0.1.1/components/spinner";

export default class ElmSubscribeForm extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    this._cInputs = new CInputs(this);
    this._cDatabase = new CDatabase(this);
    this._cSpinner = new CSpinner(this);
    this._cSpinner.setDisplay(false)
  };

  connectedCallback() {
    return this._cInputs.connectedCallback()
  };

  disconnectedCallback() {
    return this._cInputs.disconnectedCallback()
  };

  btnClick(email) {
    this._cSpinner.setDisplay(true);

    return this._cDatabase.addSubscribe(email, (candidate) => {
      this._cSpinner.setDisplay(false);
      this._cInputs.clearValue();

      return candidate ? Email.sendSubscribe(candidate, isSend => (
        isSend ? Modals.alert({message: `${`
<div class='text-center'>
  <i class='bi bi-person-plus display-1 text-success'></i>
  <h1 class='mt-3'>Přihlášení k odběru</h1>
  <p class='lead'>Byl jste úspěšně přidán mezi odběratele. Do vašeho e-mailu bylo odesláno potvrzení.</p>
  <p>Pokud chcete zrušit odběr, tuto možnost najdete v e-mailu.</p>
</div>
              `}`}) : Modals.alert({message: `${`
<div class='text-center'>
  <i class='bi bi-exclamation-triangle display-1 text-danger'></i>
  <h1 class='mt-3'>Email se nedokákal poslat</h1>
  <p class='lead'>Prosím <a href='https://filipvrba.vercel.app/#kontakty' target='_blank'>kontaktujte mě</a> a nahlašte tuto technickou chybu.</p>
</div>
              `}`})
      )) : Modals.alert({message: `${`
<div class='text-center'>
  <i class='bi bi-exclamation-triangle display-1 text-danger'></i>
  <h1 class='mt-3'>Nepodařané přihlášení k odběru</h1>
  <p class='lead'>Možná už tento e-mail existuje v seznamu odběratelů, nebo došlo k technické chybě.</p>
  <p>Zkuste to prosím znovu, nebo mě <a href='https://filipvrba.vercel.app/#kontakty' target='_blank'>kontaktujte</a> pro pomoc.</p>
</div>
          `}`})
    })
  };

  initElm() {
    let template = `${`
<div class='row justify-content-center'>
  <div class='col-md-8'>
    <div class='card'>
      <elm-spinner class='spinner-overlay'></elm-spinner>

      <div class='card-body'>
        <div>
          <label for='subscribeFormEmail' class='form-label'>Email</label>
          <div class='input-group'>
            <span class='input-group-text'><i class='bi bi-envelope-fill'></i></span>
            <input type='email' class='form-control' id='subscribeFormEmail' placeholder='Zadejte svůj e-mail' aria-describedby='subscribeFormFeedback' required='' data-button-id='subscribeFormBtn'>
            <div id='subscribeFormFeedback' class='invalid-feedback'>
              Zadejte platnou emailovou adresu.
            </div>
          </div>
          <div class='d-grid mt-3'>
            <button id='subscribeFormBtn' class='btn btn-secondary' onclick='subscribeFormBtnClick()'><i class='bi bi-envelope-paper'></i> Odebírat</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}