import 'Net', './net'

import 'SubscribeHTML',   '../../html/templates/subscribe.html?raw'
import 'CardArticleHTML', '../../html/templates/card_article.html?raw'
import 'NewArticlesHTML', '../../html/templates/new_articles.html?raw'

class Email
  CONFIRMATION_URL = 'https://filipvrba-blog.vercel.app/'

  def self.subscribe_request(candidate)
    emails = []

    unsub_link = "#{CONFIRMATION_URL}?cid=#{candidate.id}#unsubscribe"
    email = {
      to: candidate.email,
      subject: "Nezmeškejte žádnou novinku – máte odběr na blogu!",
      html: SubscribeHTML.sub('UNSUB_LINK', unsub_link),
    }

    emails.push(email)

    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emails: emails,
      })
    }
  end

  def self.get_card_articles(articles)
    results = []

    articles.each do |article|
      template = CardArticleHTML
        .sub('IMG_BANNER', "#{CONFIRMATION_URL}/api/image/#{article.file_id}")
        .sub('ARTICLE_TITLE', article.title)
        .sub('ARTICLE_SHORT_TEXT', article.short_text)
        .sub('ARTICLE_LINK', "#{CONFIRMATION_URL}?aid=#{article.id}#article")
      results.push(template)
    end

    return results.join('')
  end

  def self.new_articles_request(data)
    emails = []

    data.each do |candidate|
      unsub_link = "#{CONFIRMATION_URL}?cid=#{candidate.candidate_id}#unsubscribe"
      template_articles = Email.get_card_articles(candidate.articles)
      email = {
        to: candidate.email,
        subject: "Nové články na blogu!",
        html: NewArticlesHTML
          .sub('UNSUB_LINK', unsub_link)
          .sub('ARTICLES', template_articles),
      }

      emails.push(email)
    end

    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emails: emails,
      })
    }
  end

  def self.send(request, &callback)
    fetch('/api/send-email', request)
    .then(lambda do |response|
      {obj: response.json(), status: response.status}
    end)
    .then(lambda do |obj_detail|
      if obj_detail.status == 200
        callback(obj_detail.obj, true) if callback
      else
        callback(obj_detail.obj, false) if callback
      end
    end)
  end

  def self.send_log(options, &callback)
    query = "INSERT INTO subscriber_email_logs (subscriber_id, email_type) " +
      "VALUES (#{options.candidate_id}, '#{options.type}');"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end

  def self.send_subscribe(candidate, &callback)
    request = Email.subscribe_request(candidate)
    Email.send(request) do |response, is_send|
      if is_send
        Email.send_log({type: 'subscribe', candidate_id: candidate.id})
      end

      callback(is_send) if callback
    end
  end

  def self.send_new_articles(data, &callback)
    request = Email.new_articles_request(data)
    Email.send(request) do |response, is_send|
      if is_send
        data.each do |candidate|
          id = candidate.candidate_id

          candidate.articles.each do |article|
            Email.send_log({type: "sendArticle-#{article.id}", candidate_id: id})
          end
        end
      end

      callback(is_send) if callback
    end
  end
end
window.Email = Email