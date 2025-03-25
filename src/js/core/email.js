import Net from "./net";
import SubscribeHTML from "../../html/templates/subscribe.html?raw";

class Email {
  static subscribeRequest(candidate) {
    let emails = [];

    let email = {
      to: candidate.email,
      variables: {unsubLink: `${Email.CONFIRMATION_URL}?cid=${candidate.id}#unsubscribe`}
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
    console.log(request);

    return Email.send(request, (response) => {
      if (callback) return callback(response)
    })
  }
};

Email.CONFIRMATION_URL = "https://filipvrba-blog.vercel.app/";
window.Email = Email