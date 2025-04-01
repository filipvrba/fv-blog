import 'CDatabase', '../components/elm-article/database'
import 'CContents', '../components/elm-article/contents'
import 'CSeo',      '../components/elm-article/seo'

export default class ElmArticle < HTMLElement
  attr_reader :article_id, :is_preview
  attr_reader :c_database, :c_seo

  def initialize
    super
    
    @article_id = URLParams.get_index('aid') || 0
    @is_preview = URLParams.get('preview') || ''
    @is_preview = @is_preview == 'true'
    
    @c_seo      = CSeo.new(self)
    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)

    @c_contents.update_container()
  end

  def connected_callback()
    unless CMP.get_consent() == 'none'
      @c_database.send_log_visit()
      @c_database.send_log_click()
    end
  end

  def disconnected_callback()
  end
end