export default class CInputs
  attr_reader :admin_article_idimage, :admin_article_category
  attr_reader :admin_article_title, :admin_article_text

  def initialize(parent)
    @parent = parent

    @h_admin_article_idimage_keypress = lambda { admin_article_idimage_keypress() }
    @h_admin_article_category_keypress = lambda { admin_article_category_keypress() }
    @h_admin_article_title_keypress = lambda { admin_article_title_keypress() }
    @h_admin_article_text_keypress = lambda { admin_article_text_keypress() }

    @admin_article_idimage = @parent.query_selector('#adminArticleIDImage')
    @admin_article_category = @parent.query_selector('#adminArticleCategory')
    @admin_article_title = @parent.query_selector('#adminArticleTitle')
    @admin_article_text = @parent.query_selector('#adminArticleText')
    @admin_article_btn_save = @parent.query_selector('#adminArticleBtnSave')
    @admin_article_btn_back = @parent.query_selector('#adminArticleBtnBack')

    window.admin_article_btn_save_click = admin_article_btn_save_click
    window.admin_article_btn_back_click = admin_article_btn_back_click
  end

  def connected_callback()
    @admin_article_idimage.add_event_listener('keypress', @h_admin_article_idimage_keypress)
    @admin_article_category.add_event_listener('keypress', @h_admin_article_category_keypress)
    @admin_article_title.add_event_listener('keypress', @h_admin_article_title_keypress)
    @admin_article_text.add_event_listener('keypress', @h_admin_article_text_keypress)
  end

  def disconnected_callback()
    @admin_article_idimage.remove_event_listener('keypress', @h_admin_article_idimage_keypress)
    @admin_article_category.remove_event_listener('keypress', @h_admin_article_category_keypress)
    @admin_article_title.remove_event_listener('keypress', @h_admin_article_title_keypress)
    @admin_article_text.remove_event_listener('keypress', @h_admin_article_text_keypress)
  end

  def admin_article_btn_save_click()
    is_admin_article_idimage = have_admin_article_idimage()
    is_admin_article_category = have_admin_article_category()
    is_admin_article_title = have_admin_article_title()
    is_admin_article_text = have_admin_article_text()

    Bootstrap.change_valid_element(@admin_article_idimage, is_admin_article_idimage)
    Bootstrap.change_valid_element(@admin_article_category, is_admin_article_category)
    Bootstrap.change_valid_element(@admin_article_title, is_admin_article_title)
    Bootstrap.change_valid_element(@admin_article_text, is_admin_article_text)

    unless is_admin_article_idimage && is_admin_article_category && is_admin_article_title && is_admin_article_text
      return
    end

    fn_true = lambda do
      @parent.btn_save_click({
        image_id: @admin_article_idimage.value,
        category: @admin_article_category.value,
        title: @admin_article_title.value,
        text: @admin_article_text.value,
      })
    end

    Modals.confirm({fn_true: fn_true})
  end

  def admin_article_btn_back_click()
    @parent.c_contents.goto_articles()
  end
  
  def admin_article_idimage_keypress()
    return unless event.key == 'Enter'

    @admin_article_category.focus()
  end
  
  def admin_article_category_keypress()
    return unless event.key == 'Enter'

    @admin_article_title.focus()
  end
  
  def admin_article_title_keypress()
    return unless event.key == 'Enter'

    @admin_article_text.focus()
  end
  
  def admin_article_text_keypress()
    return unless event.key == 'Enter'

    @admin_article_btn_save.click()
  end
  
  def have_admin_article_idimage()
    @admin_article_idimage.value.to_i >= 0
  end

  def have_admin_article_category()
    @admin_article_category.value.length > 0
  end

  def have_admin_article_title()
    @admin_article_title.value.length > 0
  end

  def have_admin_article_text()
    @admin_article_text.value.length > 0
  end
end
