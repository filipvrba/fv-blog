import 'CDatabase', '../components/elm-article/database'
import 'CContents', '../components/elm-article/contents'

export default class ElmArticle < HTMLElement
  attr_reader :article_id
  attr_reader :c_database

  def initialize
    super
    
    @article_id = URLParams.get_index('aid') || 0
    
    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)
  end

  def connected_callback()
    @c_contents.update_container()
  end

  def disconnected_callback()
  end
end