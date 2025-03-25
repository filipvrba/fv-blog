import 'Net', './net'
import 'SubscribeHTML', '../../html/templates/subscribe.html?raw'

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

  def self.send(request, &callback)
    fetch('/api/send-email', request)
    .then(lambda do |response|
      response.json()
    end)
    .then(lambda do |obj|
      callback(obj) if callback
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
    Email.send(request) do |response|
      Email.send_log({type: 'subscribe', candidate_id: candidate.id})
      callback(response) if callback
    end
  end
end
window.Email = Email