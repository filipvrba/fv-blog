import 'Net', '../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def save_article(options, &callback)
    file_id    = options.image_id == 0.to_s ? 'NULL' : options.image_id
    title      = options.title.encode_base64()
    category   = options.category.encode_base64()
    short_text = options.text.shorten_text().encode_base64()
    full_text  = options.text.encode_base64()
    is_adult   = options.is_adult ? 1 : 0

    query = "INSERT INTO articles (user_id, file_id, title, category, short_text, full_text, is_adult) " +
      "VALUES (#{@parent.user_id}, #{file_id}, '#{title}', '#{category}', " +
      "'#{short_text}', '#{full_text}', #{is_adult});"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end

  def update_article(options, &callback)
    file_id    = options.image_id == 0.to_s ? 'NULL' : options.image_id
    title      = options.title.encode_base64()
    category   = options.category.encode_base64()
    short_text = options.text.shorten_text().encode_base64()
    full_text  = options.text.encode_base64()
    is_adult   = options.is_adult ? 1 : 0

    query = "UPDATE articles SET file_id = #{file_id}, title = '#{title}', " +
      "category = '#{category}', short_text = '#{short_text}', " +
      "full_text = '#{full_text}', is_adult = #{is_adult}, changed_at = CURRENT_TIMESTAMP " +
      "WHERE id = #{@parent.article_id};"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end 

  def get_article(&callback)
    query = "SELECT file_id, title, category, full_text, is_adult " +
      "FROM articles WHERE id = #{@parent.article_id};"
    
    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        articles = rows.map do |h|
          {
            file_id:   h['file_id'].to_i || 0,
            title:     h.title.decode_base64(),
            category:  h.category.decode_base64(),
            full_text: h['full_text'].decode_base64(),
            is_adult: h['is_adult'] == 1.to_s,
          }
        end
        callback(articles[0]) if callback
      else
        callback(nil) if callback
      end
    end
  end
end