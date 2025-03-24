import Net from "./net";

class Email {
  static subscribeRequest(candidate) {
    let emails = [];

    let message = `${`
<p>Ahoj,</p>

<p>Děkuji, že jste se přihlásili k odběru novinek na mém osobním webu. Od teď vám budu pravidelně posílat informace a novinky, které by vás mohly zajímat.</p>

<p>Pokud někdy usoudíte, že už nechcete dostávat e-maily, můžete se snadno odhlásit kliknutím na tento odkaz:</p>
<a href='${Email.CONFIRMATION_URL}?cid${candidate.id}#unsubscribe'>Zrušit odběr</a>

<p>Těším se na to, že vás budu moci pravidelně informovat. Pokud máte jakékoliv otázky nebo zpětnou vazbu, klidně se ozvěte.</p>

<p>S pozdravem,</p>
<p>Filip Vrba</p>
<a href='${Email.CONFIRMATION_URL}'>${Email.CONFIRMATION_URL.replaceAll(
      /https:|[\/]/g,
      ""
    )}</a>
    `}`;

    let email = {
      to: candidate.email,
      subject: "Děkuji, že jste se přihlásili k odběru",
      html: message.replaceAll("\"", "'")
    };

    emails.push(email);

    return {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({emails})
    }
  };

  static send(request, callback) {
    return fetch("/api/send-email", request).then(response => response.json()).then((obj) => {
      if (callback) return callback(obj)
    })
  };

  static sendSubscribe(candidate, callback) {
    let request = Email.subscribeRequest(candidate);

    return Email.send(request, (response) => {
      if (callback) return callback.call(response)
    })
  }
};

Email.CONFIRMATION_URL = "https://filipvrba-blog.vercel.app/";
window.Email = Email