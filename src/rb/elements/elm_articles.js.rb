import 'CContents', '../components/elm-articles/contents'
import 'CDatabase', '../components/elm-articles/database'

export default class ElmArticles < HTMLElement
  attr_reader :c_database

  def initialize
    super
    
    init_elm()

    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)
  end

  def connected_callback()
    @c_contents.update_container()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
    <div id='articlesContainer' class='container row mx-auto'>
    </div>
    """

    self.innerHTML = template
  end
end