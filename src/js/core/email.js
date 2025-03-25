import Net from "./net";
import SubscribeHTML from "../../html/templates/subscribe.html?raw";

class Email {
  static subscribeRequest(candidate) {
    let emails = [];
    let unsubLink = `${Email.CONFIRMATION_URL}?cid=${candidate.id}#unsubscribe`;

    let email = {
      to: candidate.email,
      subject: "Nezmeškejte žádnou novinku – máte odběr na blogu!",
      html: SubscribeHTML.replace("UNSUB_LINK", unsubLink)
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

  static sendLog(options, callback) {
    let query = `INSERT INTO subscriber_email_logs (subscriber_id, email_type) VALUES (${options.candidateId}, '${options.type}');`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  };

  static sendSubscribe(candidate, callback) {
    let request = Email.subscribeRequest(candidate);

    return Email.send(request, (response) => {
      Email.sendLog({type: "subscribe", candidateId: candidate.id});
      if (callback) return callback(response)
    })
  }
};

Email.CONFIRMATION_URL = "https://filipvrba-blog.vercel.app/";
window.Email = Email