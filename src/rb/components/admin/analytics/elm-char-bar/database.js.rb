import 'Net', '../../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def clicks_per_hour(&callback)
    query = "SELECT strftime('%H', clicked_at) AS hour, COUNT(*) AS click_count
      FROM article_clicks
      GROUP BY hour
      ORDER BY hour;"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        data = rows.map do |h|
          {
            hour: h.hour.to_i,
            click_count: h['click_count'].to_i,
          }
        end

        callback(data) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def char_data(rows)
    return {
      labels: rows.map {|row| row.hour + ":00" },
      datasets: [
        {
          label: "Počet kliknutí za hodinu",
          data: rows.map {|row| row.click_count },
          background_color: "rgba(54, 162, 235, 0.5)",
          border_color: "rgba(54, 162, 235, 1)",
          border_width: 1
        }
      ]
    }
  end
end