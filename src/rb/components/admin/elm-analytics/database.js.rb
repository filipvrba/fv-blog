import 'Net', '../../../core/net'

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

  def get_count_referrer(&callback)
    query = "SELECT 
    av.referrer,
    COUNT(av.referrer) AS referrer_count
FROM article_visits av
WHERE av.referrer IS NOT NULL
GROUP BY av.referrer
ORDER BY referrer_count DESC;
"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        referrer = rows.map do |h|
          {
            referrer: h.referrer.decode_base64(),
            count: h['referrer_count'].to_i,
          }
        end

        callback(referrer) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def get_count_devices(&callback)
    query = "SELECT 
    av.device_type,
    COUNT(av.device_type) AS device_count
FROM article_visits av
GROUP BY av.device_type
ORDER BY device_count DESC;
"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        devices = rows.map do |h|
          {
            type:  h['device_type'],
            count: h['device_count'].to_i,
          }
        end

        callback(devices) if callback
      else
        callback(nil) if callback
      end
    end
  end
end