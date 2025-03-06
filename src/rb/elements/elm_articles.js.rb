import 'CContents', '../components/elm-articles/contents'
import 'CDatabase', '../components/elm-articles/database'

export default class ElmArticles < HTMLElement
  attr_reader :c_database, :c_contents

  def initialize
    super
    
    init_elm()

    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)
  end

  def connected_callback()
    @c_database.get_all_articles() do |articles|
      @c_contents.update_container(articles)
    end
  end

  def disconnected_callback()
  end

  def init_elm()
    self.innerHTML = CDatabase.main_template()
  end
end