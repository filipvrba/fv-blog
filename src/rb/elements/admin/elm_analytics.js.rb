import 'CDatabase', '../../components/admin/elm-analytics/database'
import 'CContents', '../../components/admin/elm-analytics/contents'
import 'CPagination', '../../components/admin/elm-analytics/pagination'
import 'ElmSettings', '../../packages/bef-client-rjs-0.1.1/elements/elm_settings'

import 'ElmAdminAnalyticsFilter', './analytics/elm_filter'

export default class ElmAdminAnalytics < HTMLElement
  attr_reader :filter_date
  attr_reader :c_contents

  def initialize
    super

    @h_category_click = lambda {|e| category_click(e.detail.value)}
    @h_filter_active  = lambda {|e| filter_active(e.detail.value)}

    init_elm()

    @c_database   = CDatabase.new(self)
    @c_contents   = CContents.new(self)
    @c_pagination = CPagination.new(self)
  end

  def connected_callback()
    Events.connect('#app', ElmSettings::ENVS.category_click, @h_category_click)
    Events.connect('#app', ElmAdminAnalyticsFilter::ENVS.active, @h_filter_active)
    @c_pagination.connected_callback()

    update_elements()
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmSettings::ENVS.category_click, @h_category_click)
    Events.disconnect('#app', ElmAdminAnalyticsFilter::ENVS.active, @h_filter_active)
    @c_pagination.disconnected_callback()
  end

  def category_click(index)
    unless index == 'analytics'
      return
    end

    update_elements()
  end

  def filter_active(date)
    @filter_date = date
    update_elements()
  end

  def update_elements()
    @c_contents.update_time()

    @c_database.get_count_referrer() do |refferer|
      #@c_contents.udpate_tbody_referrer(refferer)
      @c_pagination.set_referrer_containers(refferer)
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
    <div class='d-flex justify-content-center align-items-center gap-3'>
      <p id='analyticsTime' class='m-0'>~~~</p>
      <elm-admin-analytics-filter></elm-admin-analytics-filter>
    </div>
  </div>

  <div class='mt-3 row d-flex justify-content-center'>
    <div class='col-md-6 col-lg-4 mb-4'>
      <elm-admin-analytics-articles></elm-admin-analytics-articles>
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

        <elm-pagination id='adminAnalyticsReferrerPagination' class='mb-2' centered></elm-pagination>
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
<elm-admin-analytics-char-bar-modal></elm-admin-analytics-char-bar-modal>
    """

    self.innerHTML = template
  end

end