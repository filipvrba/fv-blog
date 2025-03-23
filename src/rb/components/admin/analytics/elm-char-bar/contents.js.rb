import 'Chart', 'chart.js/auto'

export default class CContents
  def initialize(parent)
    @parent = parent

    @canvas = @parent.query_selector("#adminAnalyticsChartBarCanvas")
    @ctx    = @canvas.get_context("2d")
    @chart  = nil
  end

  def render_chart(data)
    unless @chart    
      @chart = Chart.new(@ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          maintain_aspect_ratio: false,
          scales: {
              y: { begin_at_zero: true }
          },
          on_click: bar_click,
        },
      })
    else
      @chart.data.labels = data.labels
      @chart.data.datasets[0].data = data.datasets[0].data

      @chart.update()
    end
  end

  def bar_click(event)
    active_points = @chart.get_elements_at_event_for_mode(event, 'nearest', {intersect: true}, true)
  
    if active_points.length > 0
      index = active_points[0].index
      label = @chart.data.labels[index]

      Modals.char_bar_modal(label)
    end
  end
end