export default class CEmails
  def initialize(parent)
    @parent   = parent
    @candidates = []
  end

  def send(checked_articles)
    published_articles = checked_articles.select {|h| !h.is_published}

    unless published_articles.length > 0
      return
    end

    @parent.c_database.get_relevant_info_articles(published_articles) do |articles|
      relevant_candidates(published_articles) do |candidates|
        data = get_data(articles, candidates)
        have_data = data.length > 0

        if have_data 
          Email.send_new_articles(data) do |is_send|
            unless is_send
              Modals.alert({
                message: """
                <div class='text-center'>
                  <i class='bi bi-file-earmark-x display-1 text-danger'></i>
                  <h1 class='mt-3'>Zveřejnění selhalo</h1>
                  <p class='lead'>Publikování článků selhalo, e-mail nebyl odeslán.</p>
                </div>
                """
              })
            end
          end
        end
      end
    end
  end

  def relevant_candidates(checked_articles, &callback)
    @candidates = []
    checked_articles.each do |checked_article|
      article_id = checked_article.article_id

      @parent.c_database.get_relevant_subscribe_candidates(article_id) do |candidates|
        article = {
          article_id: article_id,
          candidates: candidates || [],
        }
        @candidates.push(article)

        if @candidates.length == checked_articles.length
          callback(@candidates) if callback
        end
      end
    end
  end

  def get_data(articles, candidates)
    emails_hash = {}

    candidates.each do |email_entry|
      article_id = email_entry.article_id.to_i
      article    = articles.find { |a| a.id == article_id }

      email_entry.candidates.each do |candidate|
        candidate_id = candidate.id
        email_address = candidate.email

        if emails_hash[candidate_id]
          emails_hash[candidate_id].articles.push(
            {
              id:         article.id,
              file_id:    article.file_id,
              title:      article.title,
              short_text: article.short_text
            }
          )
        else
          emails_hash[candidate_id] = {
            candidate_id: candidate_id,
            email:        email_address,
            articles: [
              {
                id:         article.id,
                file_id:    article.file_id,
                title:      article.title,
                short_text: article.short_text
              }
            ]
          }
        end
      end
    end

    return emails_hash.values()
  end
end