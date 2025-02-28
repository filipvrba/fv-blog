export default class CContents
  attr_reader :t_body

  def initialize(parent)
    @parent = parent

    @t_body = @parent.query_selector('#adminArticlesTBody')
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
    <tr>
      <th scope='row'>#{article.id}</th>
      <td class='pointer' onclick='adminArticlesDropdownBtnEditClick(#{article.id})'>#{article.title}</td>
      <td>#{article.category}</td>
      <td class='pointer text-center' onclick='adminArticlesBtnShowClick(#{article.id}, #{article.is_published})' >#{published_icons(article.is_published)}</td>
      <td>
        <div class='form-check form-check-reverse mx-5'>
          <input id='adminArticlesCheck-#{article.id}-#{article.is_published ? 1 : 0}' class='form-check-input' type='checkbox'>
        </div>
      </td>
    </tr>
    """
  end

  def update_table()
    @parent.set_spinner_visibility(true)
    @parent.c_database.get_info_articles() do |articles|
      @parent.set_spinner_visibility(false)

      elements = []

      if articles
        articles.each do |article|
          template = template_article(article)
          elements.push(template)
        end
      else
        empty_temaplate = """
        <tr>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
        </tr>
        """
        elements.push(empty_temaplate)
      end

      @t_body.innerHTML = elements.join('')
    end
  end
end