import Net from "./net";

class Email {
  static subscribeRequest(candidate) {
    let emails = [];

    let email = {
      to: candidate.email,
      variables: {url: Email.CONFIRMATION_URL, candidateId: candidate.id}
    };

    emails.push(email);

    return {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({templateId: 6_839_019, emails})
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
      if (callback) return callback(response)
    })
  }
};

Email.CONFIRMATION_URL = "https://filipvrba-blog.vercel.app/";
window.Email = Email