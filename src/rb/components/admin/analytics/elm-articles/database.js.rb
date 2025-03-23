import 'Net', '../../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_count_articles(&callback)
    query = "SELECT 
    a.id, 
    a.title, 
    COUNT(DISTINCT av.id) AS article_count, 
    COUNT(DISTINCT ac.id) AS click_count, 
    ROUND(CAST(COUNT(DISTINCT ac.id) AS FLOAT) / NULLIF(COUNT(DISTINCT av.id), 0), 2) AS conversion_rate 
FROM articles a
INNER JOIN article_visits av ON a.id = av.article_id
INNER JOIN article_clicks ac ON a.id = ac.article_id
GROUP BY a.id, a.title
ORDER BY article_count DESC;
"
    if @parent.hour
      hour = DateUtils.convert_to_default_hour(@parent.hour)

      query = "SELECT 
    a.id,
    a.title,
    COUNT(ac.id) AS click_count
FROM 
    article_clicks ac
JOIN 
    articles a ON ac.article_id = a.id
WHERE 
    strftime('%H', ac.clicked_at) = '#{hour}'
GROUP BY 
    a.id, a.title
ORDER BY 
    click_count DESC;"
    end

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        articles = rows.map do |h|
          {
            id:    h.id.to_i,
            title: h.title.decode_base64(),
            count: h['article_count'].to_i,
            click_count: h['click_count'].to_i,
            conversion_rate: h['conversion_rate']
          }
        end

        callback(articles) if callback
      else
        callback(nil) if callback
      end
    end
  end
end