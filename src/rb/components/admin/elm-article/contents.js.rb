export default class CContents
  def initialize(parent)
    @parent = parent

    @parent.set_spinner_visibility(false)
  end

  def goto_articles()
    @parent.innerHTML = "<elm-admin-articles user-id='#{@parent.user_id}'></elm-admin-articles>"
  end

  def update_container()
    unless @parent.article_id
      return
    end

    @parent.set_spinner_visibility(true)
    @parent.c_database.get_article() do |article|
      @parent.set_spinner_visibility(false)

      @parent.c_inputs.admin_article_idimage.value = article.file_id
      @parent.c_inputs.admin_article_category.value = article.category
      @parent.c_inputs.admin_article_title.value = article.title
      @parent.c_inputs.admin_article_text.value = article.full_text
    end
  end
end