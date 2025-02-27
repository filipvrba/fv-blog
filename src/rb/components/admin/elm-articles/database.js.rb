import 'Net', '../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_info_articles(&callback)
    query = "SELECT a.id, a.title, a.category " +
      "FROM articles a JOIN users u ON a.user_id = u.id WHERE a.user_id = #{@parent.user_id};"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        articles = rows.map do |h|
          {
            id: h.id,
            title: h.title.decode_base64(),
            category: h.category.decode_base64(),
          }
        end

        callback(articles) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def remove_article(id_articles, &callback)
    unless id_articles.length > 0
      return
    end

    query = "DELETE FROM articles WHERE id IN (#{id_articles.join(', ')});"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end
end