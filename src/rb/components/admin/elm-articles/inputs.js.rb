export default class CInputs
  def initialize(parent)
    @parent = parent

    window.admin_articles_dropdown_btn_new_click    = dropdown_btn_new_click
    window.admin_articles_dropdown_btn_remove_click = dropdown_btn_remove_click
    window.admin_articles_dropdown_btn_edit_click   = dropdown_btn_edit_click
  end

  def dropdown_btn_new_click()
    @parent.c_contents.goto_article()
  end

  def dropdown_btn_remove_click()
    elm_articles  = Array.from(
      @parent.c_contents.t_body.query_selector_all('[id^="adminArticlesCheck'))

    info_articles = elm_articles.map do |article|
      {article_id: article.id.split('-').last, checked: article.checked}
    end
    checked_articles = info_articles.select {|h| h.checked}

    unless checked_articles.length > 0
      return
    end

    fn_true = lambda do
      id_articles = checked_articles.map{|h| h.article_id.to_i}

      @parent.set_spinner_visibility(true)
      @parent.c_database.remove_article(id_articles) do |message|
        @parent.set_spinner_visibility(false)
        @parent.c_contents.update_table() if message
      end
    end

    Modals.confirm({fn_true: fn_true})
  end

  def dropdown_btn_edit_click(article_id)
    @parent.c_contents.goto_article(article_id)
  end
end