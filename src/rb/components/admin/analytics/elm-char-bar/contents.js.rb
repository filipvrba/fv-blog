import 'Chart', 'chart.js/auto'

export default class CContents
  def initialize(parent)
    @parent = parent

    @canvas = @parent.query_selector("#adminAnalyticsChartBarCanvas")
    @ctx    = @canvas.get_context("2d")
  end

  def render_chart(data)
    chart = Chart.get_chart(@canvas)

    unless chart    
      Chart.new(@ctx, {
        type: "bar",
        data: data,
        options: {
            responsive: true,
            maintain_aspect_ratio: false,
            scales: {
                y: { begin_at_zero: true }
            }
        }
      })
    else
      chart.data.labels = data.labels
      chart.data.datasets[0].data = data.datasets[0].data

      chart.update()
    end
  end
end