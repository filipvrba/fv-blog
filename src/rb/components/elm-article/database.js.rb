import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_artcile(&callback)
    query = "SELECT file_id, title, full_text, created_at " +
      "FROM articles WHERE id = #{@parent.article_id};"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        articles = rows.map do |h|
          {
            file_id: h['file_id'].to_i || '',
            title: h.title.decode_base64(),
            full_text: h['full_text'].decode_base64(),
            created_at: DateUtils.format_date(h['created_at'])
          }
        end
        callback(articles.first) if callback
      else
        callback(nil) if callback
      end
    end
  end
end