import 'Net', '../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_info_articles(&callback)
    query = "SELECT a.id, a.title, a.category, a.is_published " +
      "FROM articles a JOIN users u ON a.user_id = u.id WHERE a.user_id = #{@parent.user_id} " +
      "ORDER BY a.created_at DESC;"

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

  def get_relevant_info_articles(checked_articles, &callback)
    unless checked_articles.length > 0
      return
    end

    where_ids = checked_articles.map {|h| h.article_id}

    query = "SELECT id, title, short_text FROM articles " +
      "WHERE id IN (#{where_ids.join(', ')});"
#     query = "SELECT 
#     a.id, 
#     a.title, 
#     (SELECT GROUP_CONCAT(fp.data, '') 
#      FROM (SELECT data FROM file_parts 
#            WHERE file_id = a.file_id 
#            ORDER BY part_order) fp) AS image_base64, 
#     a.short_text 
# FROM articles a 
# WHERE a.id IN (#{where_ids.join(', ')});

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        articles = rows.map do |h|
          {
            id: h.id.to_i,
            title: h.title.decode_base64(),
            short_text: h['short_text'].decode_base64(),
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

  def get_relevant_subscribe_candidates(article_id, &callback)
    query = "SELECT s.id, s.email
      FROM subscribers s
      WHERE s.id NOT IN (
        SELECT sl.subscriber_id
        FROM subscriber_email_logs sl
        WHERE sl.email_type LIKE 'sendArticle-%'
        AND sl.email_type LIKE 'sendArticle-#{article_id}%'
      );"
    
    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        candidates = rows.map do |h|
          {
            id:    h.id.to_i,
            email: h.email.decode_base64(),
          }
        end

        callback(candidates) if callback
      else
        callback(nil) if callback
      end
    end
  end
  
end