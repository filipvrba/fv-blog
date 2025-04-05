import "CContents", '../../../components/admin/analytics/elm-articles/contents'
import "CDatabase", '../../../components/admin/analytics/elm-articles/database'
import 'ElmSettings', '../../../packages/bef-client-rjs-0.1.1/elements/elm_settings'

import 'ElmPagination', '../../elm_pagination'
import 'ElmAdminAnalyticsFilter', './elm_filter'

export default class ElmAdminAnalyticsArticles < HTMLElement
  NUMERUS_MAXIMUS = 5

  attr_reader :hour, :filter_date

  def initialize
    super

    @h_category_click            = lambda {|e| category_click(e.detail.value)}
    @h_pagination_articles_click = lambda {|e| pagination_articles_click(e.detail.value)}
    @h_filter_active             = lambda {|e| filter_active(e.detail.value)}

    @hour        = self.get_attribute('hour') || nil
    @filter_date = self.get_attribute('filter-date') || nil
    @article_containers = nil

    init_elm()

    @c_contents = CContents.new(self)
    @c_database = CDatabase.new(self)
  end

  def connected_callback()
    Events.connect('#app', ElmSettings::ENVS.category_click, @h_category_click)
    Events.connect(@c_contents.elm_article_paginations, ElmPagination::ENVS.click, @h_pagination_articles_click)
    Events.connect('#app', ElmAdminAnalyticsFilter::ENVS.active, @h_filter_active)

    update_elements()
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmSettings::ENVS.category_click, @h_category_click)
    Events.disconnect(@c_contents.elm_article_paginations, ElmPagination::ENVS.click, @h_pagination_articles_click)
    Events.disconnect('#app', ElmAdminAnalyticsFilter::ENVS.active, @h_filter_active)
  end

  def category_click(index)
    unless index == 'analytics'
      return
    end

    update_elements() unless @hour
  end

  def pagination_articles_click(id_container)
    @c_contents.udpate_tbody_articles(@article_containers[id_container])
  end

  def filter_active(date)
    unless @hour
      @filter_date = date
      update_elements()
    end
  end

  def update_elements()
    @c_database.get_count_articles() do |articles|
      @article_containers = articles ? articles.divide_into_groups(NUMERUS_MAXIMUS) : []
      Events.emit(@c_contents.elm_article_paginations, ElmPagination::ENVS.init, @article_containers.length)
    end
  end

  def init_elm()
    counts_title = @hour ? '' : "title='uživatelé / celek'"

    template = """
<div class='card anim-card shadow-sm h-100 overflow-hidden'>
  <div class='card-body'>
    <table class='table'>
      <thead>
        <tr>
          <th scope='col'>Název článku</th>
          <th scope='col' class='text-end' #{counts_title}>Zobrazení</th>
        </tr>
      </thead>
      <tbody id='analyticsArtcilesTBody'>
        <tr>
          <td class='text-center'>~~~</td>
          <td class='text-center'>~~~</td>
        </tr>
      </tbody>
    </table>
  </div>

  <elm-pagination id='adminAnalyticsArticlesPagination' class='mb-2' centered></elm-pagination>
</div>
    """

    self.innerHTML = template
  end
end