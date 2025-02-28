import 'Net', '../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_info_articles(&callback)
    query = "SELECT a.id, a.title, a.category, a.is_published " +
      "FROM articles a JOIN users u ON a.user_id = u.id WHERE a.user_id = #{@parent.user_id};"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        articles = rows.map do |h|
          {
            id: h.id,
            title: h.title.decode_base64(),
            category: h.category.decode_base64(),
            is_published: h['is_published'] == 1.to_s
          }
        end

        callback(articles) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def set_visibility_article(checked_articles, &callback)
    unless checked_articles.length > 0
      return
    end

    case_ids  = checked_articles.map {|h| "WHEN id = #{h.article_id} THEN #{h.is_published ? 0 : 1}"}
    where_ids = checked_articles.map {|h| h.article_id}

    query = "UPDATE articles SET is_published = CASE #{case_ids.join(" ")} " +
      "ELSE is_published END WHERE id IN (#{where_ids.join(', ')});"

    Net.bef(query) do |message|
      callback(message) if callback
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