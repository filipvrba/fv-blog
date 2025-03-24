import 'CInputs', '../components/elm-subscribe-form/inputs'
import 'CDatabase', '../components/elm-subscribe-form/database'
import 'CSpinner',  '../packages/template-rjs-0.1.1/components/spinner'

export default class ElmSubscribeForm < HTMLElement
  def initialize
    super
    
    init_elm()

    @c_inputs   = CInputs.new(self)
    @c_database = CDatabase.new(self)
    @c_spinner  = CSpinner.new(self)

    @c_spinner.set_display(false)
  end

  def connected_callback()
    @c_inputs.connected_callback()
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback()
  end

  def btn_click(email)
    @c_spinner.set_display(true)

    @c_database.add_subscribe(email) do |candidate|
      @c_spinner.set_display(false)

      if candidate
        Email.send_subscribe(candidate) do |response|
          puts response
        end

        Modals.alert({
          message: """
<div class='text-center'>
  <i class='bi bi-person-plus display-1 text-success'></i>
  <h1 class='mt-3'>Přihlášení k odběru</h1>
  <p class='lead'>Byl jste úspěšně přidán mezi odběratele. Do vašeho e-mailu bylo odesláno potvrzení.</p>
  <p>Pokud chcete zrušit odběr, tuto možnost najdete v e-mailu.</p>
</div>
          """
        })
      else
        Modals.alert({
          message: """
<div class='text-center'>
  <i class='bi bi-exclamation-triangle display-1 text-danger'></i>
  <h1 class='mt-3'>Nepodařané přihlášení k odběru</h1>
  <p class='lead'>Možná už tento e-mail existuje v seznamu odběratelů, nebo došlo k technické chybě.</p>
  <p>Zkuste to prosím znovu, nebo mě <a href='https://filipvrba.vercel.app/#kontakty' target='_blank'>kontaktujte</a> pro pomoc.</p>
</div>
          """
        })
      end
    end
  end

  def init_elm()
    template = """
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
    """

    self.innerHTML = template
  end
end