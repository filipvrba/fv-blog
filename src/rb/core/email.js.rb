import 'Net', './net'

class Email
  CONFIRMATION_URL = 'https://filipvrba-blog.vercel.app/'

  def self.subscribe_request(candidate)
    emails = []

    email = {
      to: candidate.email,
      variables: {
        url: CONFIRMATION_URL,
        candidate_id: candidate.id
      }
    }

    emails.push(email)

    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template_id: 6839019,
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

  def self.send_subscribe(candidate, &callback)
    request = Email.subscribe_request(candidate)
    Email.send(request) do |response|
      callback(response) if callback
    end
  end
end
window.Email = Email