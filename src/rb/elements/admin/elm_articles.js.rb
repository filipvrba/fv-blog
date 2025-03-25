import 'CInputs',   '../../components/admin/elm-articles/inputs'
import 'CContents', '../../components/admin/elm-articles/contents'
import 'CDatabase', '../../components/admin/elm-articles/database'
import 'CEmails', '../../components/admin/elm-articles/emails'
import 'CSpinner',  '../../packages/template-rjs-0.1.1/components/spinner'

import 'ElmPagination', '../elm_pagination'

export default class ElmAdminArticles < HTMLElement
  NUMERUS_MAXIMUS = 8

  attr_reader :user_id
  attr_reader :c_contents, :c_database, :c_emails

  def initialize
    super
    @h_pagination_articles_click = lambda {|e| pagination_articles_click(e.detail.value)}

    @user_id            = self.get_attribute('user-id')
    @article_containers = nil

    init_elm()

    @c_spinner  = CSpinner.new(self)
    @c_inputs   = CInputs.new(self)
    @c_contents = CContents.new(self)
    @c_database = CDatabase.new(self)
    @c_emails   = CEmails.new(self)
  end

  def connected_callback()
    Events.connect(@c_contents.elm_article_paginations, ElmPagination::ENVS.click, @h_pagination_articles_click)

    update_data()
  end

  def disconnected_callback()
    Events.disconnect(@c_contents.elm_article_paginations, ElmPagination::ENVS.click, @h_pagination_articles_click)
  end

  def update_data()
    set_spinner_visibility(true)
    @c_database.get_info_articles() do |articles|
      set_spinner_visibility(false)

      @article_containers = articles.divide_into_groups(NUMERUS_MAXIMUS)
      Events.emit(@c_contents.elm_article_paginations, ElmPagination::ENVS.init, @article_containers.length)
    end
  end

  def pagination_articles_click(id_container)
    @c_contents.update_table(@article_containers[id_container])
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
          <th scope='col' class='hide-on-mobile'></th>
          <th scope='col'>Název</th>
          <th scope='col' class='hide-on-mobile'>Kategorie</th>
          <th scope='col' class='hide-on-mobile'>Viditelnost</th>
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
          <td class='text-center hide-on-mobile'>~~~</td>
          <td class='text-center'>~~~</td>
          <td class='text-center hide-on-mobile'>~~~</td>
          <td class='text-center hide-on-mobile'>~~~</td>
          <td class='text-center'>~~~</td>
        </tr>
      </tbody>
    </table>
    <elm-pagination id='adminArticlesTablePagination' class='mb-4' centered></elm-pagination>
  </div>
</div>
    """

    self.innerHTML = template
  end
end