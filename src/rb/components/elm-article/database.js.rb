import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_artcile(&callback)
    query = "SELECT file_id, title, full_text, changed_at, is_adult " +
      "FROM articles WHERE id = #{@parent.article_id} AND is_published = 1;"

    if @parent.is_preview
      query = "SELECT file_id, title, full_text, changed_at, is_adult " +
        "FROM articles WHERE user_id = " +
        "(SELECT user_id FROM tokens WHERE token = '#{Cookie.get('l-token')}' " +
        "AND expires_at > CURRENT_TIMESTAMP) AND id = #{@parent.article_id} AND is_published = 0;"
    end

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        articles = rows.map do |h|
          {
            file_id: h['file_id'].to_i || '',
            title: h.title.decode_base64(),
            full_text: h['full_text'].decode_base64(),
            changed_at: DateUtils.format_date(h['changed_at']),
            is_adult: h['is_adult'] == 1.to_s
          }
        end
        callback(articles.first) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def send_log_visit(&callback)
    vi = VisitorTracker.get_visitor_info(@parent.article_id)

    query = "INSERT OR IGNORE INTO article_visits (article_id, visitor_id, device_type, referrer) " +
      "VALUES (#{@parent.article_id}, '#{vi.visitor_id}', '#{vi.device_type}', '#{vi.referrer.encode_base64()}');"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end
end