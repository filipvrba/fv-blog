export default class CContents
  attr_reader :t_body, :elm_article_paginations

  def initialize(parent)
    @parent = parent

    @t_body = @parent.query_selector('#adminArticlesTBody')
    @elm_article_paginations = @parent.query_selector('#adminArticlesTablePagination')
  end

  def goto_article(article_id = '')
    @parent.innerHTML = "<elm-admin-article user-id='#{@parent.user_id}' article-id='#{article_id}'></elm-admin-article>"
  end

  def published_icons(is_published)
    if is_published
      return "<i class='bi bi-eye-fill text-success'></i>"
    else
      return "<i class='bi bi-eye-slash-fill text-warning'></i>"
    end
  end

  def template_article(article)
    return """
    <tr class='anim-table'>
      <th class='hide-on-mobile' scope='row'>#{article.id}</th>
      <td class='pointer' onclick='adminArticlesDropdownBtnEditClick(#{article.id})'>#{article.title}</td>
      <td class='hide-on-mobile'>#{article.category}</td>
      <td class='pointer text-center hide-on-mobile' onclick='adminArticlesBtnShowClick(#{article.id}, #{article.is_published})' >#{published_icons(article.is_published)}</td>
      <td>
        <div class='form-check form-check-reverse mx-5'>
          <input id='adminArticlesCheck-#{article.id}-#{article.is_published ? 1 : 0}' class='form-check-input' type='checkbox'>
        </div>
      </td>
    </tr>
    """
  end

  def update_table(articles)
    elements = []

    if articles
      articles.each do |article|
        template = template_article(article)
        elements.push(template)
      end
    else
      empty_temaplate = """
      <tr>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center'>---</td>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center hide-on-mobile'>---</td>
        <td class='text-center'>---</td>
      </tr>
      """
      elements.push(empty_temaplate)
    end

    @t_body.innerHTML = elements.join('')
  end
end