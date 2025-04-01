export default class CSeo
  def initialize(parent)
    @parent = parent
  end

  def set_title(article_title)
    title = "#{article_title} | #{Language.relevant.elm_routes.meta[0]}"
    document.title = title
  end
end