export default class CInputs
  def initialize(parent)
    @parent = parent

    window.articles_card_btn_click = card_btn_click
  end

  def card_btn_click(article_id)
    URLParams.set('aid', article_id)
    location.hash = '#article'
  end
end