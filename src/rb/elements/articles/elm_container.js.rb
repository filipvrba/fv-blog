import 'ElmArticles', '../elm_articles'
import 'CContentsArticles', '../../components/elm-articles/contents'
import 'ElmPagination', '../elm_pagination'

export default class ElmArticlesContainer < ElmArticles
  NUMERUS_MAXIMUS = 6

  def initialize
    super

    @h_pagination_click = lambda do |e|
      window.articles_footer_go_up()
      update_container(e.detail.value)
    end

    @article_containers = nil
    @id_container       = 0

    @elm_article_paginations = self.query_selector('#articlesPagination')
  end

  def connected_callback()
    Events.connect(@elm_article_paginations, ElmPagination::ENVS.click, @h_pagination_click)

    get_all_articles_and_emit()
  end

  def disconnected_callback()
    Events.disconnect(@elm_article_paginations, ElmPagination::ENVS.click, @h_pagination_click)

    super
  end

  def update_container(id_container)
    @id_container = id_container

    @c_contents.update_container(@article_containers[id_container]) if @article_containers
  end

  def get_all_articles_and_emit()
    @c_database.get_all_articles() do |articles|
      @article_containers = articles.divide_into_groups(NUMERUS_MAXIMUS)
      Events.emit(@elm_article_paginations, ElmPagination::ENVS.init, @article_containers.length)
    end
  end

  def init_elm()
    template = """
    #{CContentsArticles.main_template()}
    <elm-pagination id='articlesPagination' centered name-index='asid'></elm-pagination>
    """

    self.innerHTML = template
  end
end