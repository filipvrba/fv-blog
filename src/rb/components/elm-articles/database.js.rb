import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_all_articles(&callback)
    query = "SELECT id, file_id, title, short_text, category, created_at " +
      "FROM articles ORDER BY created_at DESC;"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        articles = rows.map do |h|
          {
            id: h.id.to_i,
            file_id: h['file_id'].to_i || '',
            title: h.title.decode_base64(),
            short_text: h['short_text'].decode_base64(),
            category: h.category.decode_base64(),
            created_at: DateUtils.format_date(h['created_at'])
          }
        end

        callback(articles) if callback
      else
        callback(nil) if callback
      end
    end
  end
end