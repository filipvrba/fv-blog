import 'CDatabase', '../components/elm-article/database'
import 'CContents', '../components/elm-article/contents'

export default class ElmArticle < HTMLElement
  attr_reader :article_id, :is_preview
  attr_reader :c_database

  def initialize
    super
    
    @article_id = URLParams.get_index('aid') || 0
    @is_preview = URLParams.get('preview') || ''
    @is_preview = @is_preview == 'true'
    
    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)
  end

  def connected_callback()
    @c_contents.update_container()

    if local_storage.get_item('userConsent') == 'all'
      @c_database.send_log_visit()
    end
  end

  def disconnected_callback()
  end
end