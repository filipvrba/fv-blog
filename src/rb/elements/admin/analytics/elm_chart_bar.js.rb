import 'CDatabase', '../../../components/admin/analytics/elm-char-bar/database'
import 'CContents', '../../../components/admin/analytics/elm-char-bar/contents'
import 'ElmSettings', '../../../packages/bef-client-rjs-0.1.1/elements/elm_settings'

export default class ElmAdminAnalyticsChartBar < HTMLElement
  attr_reader :c_database

  def initialize
    super
    
    @h_category_click = lambda {|e| category_click(e.detail.value)}

    init_elm()

    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)
  end

  def connected_callback()
    Events.connect('#app', ElmSettings::ENVS.category_click, @h_category_click)

    update_elm()
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmSettings::ENVS.category_click, @h_category_click)
  end

  def category_click(index)
    unless index == 'analytics'
      return
    end

    update_elm()
  end

  def update_elm()
    @c_database.clicks_per_hour() do |rows|
      data = @c_database.char_data(rows)
      @c_contents.render_chart(data)
    end
  end

  def init_elm()
    template = """
<div id='chart-container'>
  <canvas id='adminAnalyticsChartBarCanvas'></canvas>
</div>
    """

    self.innerHTML = template
  end
end