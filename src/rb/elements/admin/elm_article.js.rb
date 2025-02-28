import 'CInputs',   '../../components/admin/elm-article/inputs'
import 'CContents', '../../components/admin/elm-article/contents'
import 'CDatabase', '../../components/admin/elm-article/database'
import 'CSpinner',  '../../packages/template-rjs-0.1.1/components/spinner'

export default class ElmAdminArticle < HTMLElement
  attr_reader :user_id, :article_id
  attr_reader :c_inputs, :c_contents, :c_database

  def initialize
    super
    
    @user_id    = self.get_attribute('user-id')
    @article_id = self.get_attribute('article-id') || nil

    init_elm()

    @c_spinner  = CSpinner.new(self)
    @c_inputs   = CInputs.new(self)
    @c_contents = CContents.new(self)
    @c_database = CDatabase.new(self)
  end

  def connected_callback()
    @c_inputs.connected_callback()

    @c_contents.update_container(@article_id)
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback()
  end

  def btn_save_click(options)
    set_spinner_visibility(true)

    unless @article_id
      @c_database.save_article(options) do |message|
        set_spinner_visibility(false)

        @c_contents.goto_articles() if message
      end
    else
      @c_database.update_article(options) do |message|
        set_spinner_visibility(false)

        @c_contents.goto_articles() if message
      end
    end
  end

  def set_spinner_visibility(is_visible)
    @c_spinner.set_display_with_id(is_visible, '#spinnerAdminArticle')
  end

  def init_elm()
    template = """
<div class='container my-5'>
  <h1 class='text-center'>Správa článku</h1>
  <div class='card border-0 mt-4'>
    <elm-spinner id='spinnerAdminArticle' class='spinner-overlay'></elm-spinner>

    <div class='form-container'>

      <div class='col-md-6 mx-auto'>
        <div class='form-check form-switch mb-4'>
          <input class='form-check-input' type='checkbox' role='switch' id='adminArticleSwitchCheckAdult' data-button-id='adminArticleBtnSave'>
          <label class='form-check-label' for='adminArticleSwitchCheckAdult'>Povolit upozornění na věkovou omezenost</label>
        </div>
      </div>

      <div class='row g-3'>
        <div class='col-md-6'>
          <div class='mb-3'>
            <label for='adminArticleIDImage' class='form-label'>ID Obrázku</label>
            <input type='number' class='form-control' id='adminArticleIDImage' min='0' value='0' data-button-id='adminArticleBtnSave'>
          </div>
        </div>

        <div class='col-md-6'>
          <div class='mb-3'>
            <label for='adminArticleCategory' class='form-label'>Kategorie</label>
            <input type='text' class='form-control' id='adminArticleCategory' data-button-id='adminArticleBtnSave'>
          </div>
        </div>
      </div>
      <div class='mb-4'>
        <div class='mb-3'>
          <label for='adminArticleTitle' class='form-label'>Název</label>
          <input type='text' class='form-control' id='adminArticleTitle' data-button-id='adminArticleBtnSave'>
        </div>

        <div class='mb-3'>
          <div class='row'>
            <div class='col-6'>
              <label for='adminArticleText' class='form-label'>Text</label>
            </div>
            <div class='col-6 text-end'>
              <a class='navbar-brand' href='https://www.markdownguide.org/cheat-sheet/' target='_bland'>
                <i class='bi bi-info-circle'></i>
                MD Cheat Sheet
              </a>
            </div>
          </div>
          <textarea type='text' class='form-control' id='adminArticleText' style='height: 300px' data-button-id='adminArticleBtnSave'></textarea>
        </div>
      </div>
    </div>
    <div class='text-center'>
      <button class='btn btn-success' id='adminArticleBtnSave' onclick='adminArticleBtnSaveClick()'>Uložit</button>
      <button class='btn btn-secondary' id='adminArticleBtnBack' onclick='adminArticleBtnBackClick()'>Zpět</button>
    </div>
  <div>
<div>
    """

    self.innerHTML = template
  end
end