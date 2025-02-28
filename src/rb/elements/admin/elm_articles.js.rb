import 'CInputs',   '../../components/admin/elm-articles/inputs'
import 'CContents', '../../components/admin/elm-articles/contents'
import 'CDatabase', '../../components/admin/elm-articles/database'
import 'CSpinner',  '../../packages/template-rjs-0.1.1/components/spinner'

export default class ElmAdminArticles < HTMLElement
  attr_reader :user_id
  attr_reader :c_contents, :c_database

  def initialize
    super
    @user_id = self.get_attribute('user-id')
    
    init_elm()

    @c_spinner  = CSpinner.new(self)
    @c_inputs   = CInputs.new(self)
    @c_contents = CContents.new(self)
    @c_database = CDatabase.new(self)
  end

  def connected_callback()
    @c_contents.update_table()
  end

  def disconnected_callback()
  end

  def set_spinner_visibility(is_visible)
    @c_spinner.set_display_with_id(is_visible, '#spinnerAdminArticles')
  end

  def init_elm()
    template = """
<div class='container mt-5'>
  <h1 class='text-center'>Správa článků</h1>
  <div class='card border-0'>
    <elm-spinner id='spinnerAdminArticles' class='spinner-overlay'></elm-spinner>

    <table class='table' id='adminArticlesTable'>
      <thead>
        <tr>
          <th scope='col'></th>
          <th scope='col'>Název</th>
          <th scope='col'>Kategorie</th>
          <th scope='col'>Viditelnost</th>
          <th scope='col' class='text-end'>
            <div class='dropdown' >
              <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                <i class='bi bi-gear'></i>
                Akce
              </button>
              <ul class='dropdown-menu' >
                <li>
                  <button class='dropdown-item' onclick='adminArticlesDropdownBtnNewClick()'>Nový</button>
                </li>
                <li>
                  <button class='dropdown-item' onclick='adminArticlesDropdownBtnVisibilityClick()'>Upravit viditelnost</button>
                </li>
                <li>
                  <button class='dropdown-item' onclick='adminArticlesDropdownBtnRemoveClick()'>Odebrat</button>
                </li>
              </ul>
            </div>
          </th>
        </tr>
      </thead>
      <tbody id='adminArticlesTBody'>
        <tr>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
    """

    self.innerHTML = template
  end
end