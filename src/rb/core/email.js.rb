import 'Net', './net'

class Email
  CONFIRMATION_URL = 'https://filipvrba-blog.vercel.app/'

  def self.subscribe_request(candidate)
    emails = []

    message = """
<p>Ahoj,</p>

<p>Děkuji, že jste se přihlásili k odběru novinek na mém osobním webu. Od teď vám budu pravidelně posílat informace a novinky, které by vás mohly zajímat.</p>

<p>Pokud někdy usoudíte, že už nechcete dostávat e-maily, můžete se snadno odhlásit kliknutím na tento odkaz:</p>
<a href='#{CONFIRMATION_URL}?cid#{candidate.id}#unsubscribe'>Zrušit odběr</a>

<p>Těším se na to, že vás budu moci pravidelně informovat. Pokud máte jakékoliv otázky nebo zpětnou vazbu, klidně se ozvěte.</p>

<p>S pozdravem,</p>
<p>Filip Vrba</p>
<a href='#{CONFIRMATION_URL}'>#{CONFIRMATION_URL.gsub(/https:|[\/]/, '')}</a>
    """

    email = {
      to: candidate.email,
      subject: "Děkuji, že jste se přihlásili k odběru",
      html: message.gsub("\"", "\'"),
    }

    emails.push(email)

    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emails: emails
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
      callback.call(response) if callback
    end
  end
end
window.Email = Email