import 'CDatabase', '../../components/admin/elm-analytics/database'
import 'CContents', '../../components/admin/elm-analytics/contents'
import 'ElmSettings', '../../packages/bef-client-rjs-0.1.1/elements/elm_settings'

import 'ElmPagination', '../elm_pagination'

export default class ElmAdminAnalytics < HTMLElement
  NUMERUS_MAXIMUS = 5

  def initialize
    super

    @h_category_click = lambda {|e| category_click(e.detail.value)}
    @h_pagination_articles_click = lambda {|e| pagination_articles_click(e.detail.value)}

    @article_containers = nil

    init_elm()

    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)
  end

  def connected_callback()
    Events.connect('#app', ElmSettings::ENVS.category_click, @h_category_click)
    Events.connect(@c_contents.elm_article_paginations, ElmPagination::ENVS.click, @h_pagination_articles_click)

    update_elements()
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmSettings::ENVS.category_click, @h_category_click)
    Events.disconnect(@c_contents.elm_article_paginations, ElmPagination::ENVS.click, @h_pagination_articles_click)
  end

  def pagination_articles_click(id_container)
    @c_contents.udpate_tbody_articles(@article_containers[id_container])
  end

  def category_click(index)
    unless index == 'analytics'
      return
    end

    update_elements()
  end

  def update_elements()
    @c_contents.update_time()

    @c_database.get_count_articles() do |articles|
      @article_containers = articles.divide_into_groups(NUMERUS_MAXIMUS)
      Events.emit(@c_contents.elm_article_paginations, ElmPagination::ENVS.init, @article_containers.length)
    end

    @c_database.get_count_referrer() do |refferer|
      @c_contents.udpate_tbody_referrer(refferer)
    end

    @c_database.get_count_devices() do |devices|
      @c_contents.udpate_tbody_devices(devices)
    end
  end

  def init_elm()
    template = """
<div class='container mt-5'>
  <div class='text-center'>
    <h1>Analýza článků</h1>
    <p id='analyticsTime'>~~~</p>
  </div>

  <div class='mt-3 row d-flex justify-content-center'>
    <div class='col-md-6 col-lg-4 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Název článku</th>
                <th scope='col' class='text-end' title='uživatelé / celek'>Zobrazení</th>
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
    </div>

    <div class='col-md-6 col-lg-4 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Zdroj relace</th>
                <th scope='col' class='text-end'>Návštěvy</th>
              </tr>
            </thead>
            <tbody id='analyticsReferrerTBody'>
              <tr>
                <td class='text-center'>~~~</td>
                <td class='text-center'>~~~</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class='col-md-6 col-lg-4 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Zdroj zařízení</th>
                <th scope='col' class='text-end'>Použití</th>
              </tr>
            </thead>
            <tbody id='analyticsDevicesTBody'>
              <tr>
                <td class='text-center'>~~~</td>
                <td class='text-center'>~~~</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class='col-lg-10 mb-4'>
      <div class='card anim-card shadow-sm h-100 overflow-hidden'>
        <div class='card-body'>
          <elm-admin-analytics-chart-bar></elm-admin-analytics-chart-bar>
        </div>
      </div>
    </div>

  </div>

</div>
    """

    self.innerHTML = template
  end

end