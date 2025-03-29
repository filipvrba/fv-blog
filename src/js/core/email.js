import Net from "./net";
import SubscribeHTML from "../../html/templates/subscribe.html?raw";
import CardArticleHTML from "../../html/templates/card_article.html?raw";
import NewArticlesHTML from "../../html/templates/new_articles.html?raw";

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

  static getCardArticles(articles) {
    let results = [];

    for (let article of articles) {
      let template = CardArticleHTML.replace(
        "IMG_BANNER",
        `${Email.CONFIRMATION_URL}/api/image/${article.fileId}`
      ).replace("ARTICLE_TITLE", article.title).replace(
        "ARTICLE_SHORT_TEXT",
        article.shortText
      ).replace(
        "ARTICLE_LINK",
        `${Email.CONFIRMATION_URL}?aid=${article.id}#article`
      );

      results.push(template)
    };

    return results.join("")
  };

  static newArticlesRequest(data) {
    let emails = [];

    for (let candidate of data) {
      let unsubLink = `${Email.CONFIRMATION_URL}?cid=${candidate.candidateId}#unsubscribe`;
      let templateArticles = Email.getCardArticles(candidate.articles);

      let email = {
        to: candidate.email,
        subject: "Nové články na blogu!",

        html: NewArticlesHTML.replace("UNSUB_LINK", unsubLink).replace(
          "ARTICLES",
          templateArticles
        )
      };

      emails.push(email)
    };

    return {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({emails})
    }
  };

  static send(request, callback) {
    return fetch("/api/send-email", request).then(response => ({
      obj: response.json(),
      status: response.status
    })).then((objDetail) => {
      if (objDetail.status === 200) {
        if (callback) return callback(objDetail.obj, true)
      } else if (callback) {
        return callback(objDetail.obj, false)
      }
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

    return Email.send(request, (response, isSend) => {
      if (isSend) Email.sendLog({type: "subscribe", candidateId: candidate.id});
      if (callback) return callback(isSend)
    })
  };

  static sendNewArticles(data, callback) {
    let request = Email.newArticlesRequest(data);

    return Email.send(request, (response, isSend) => {
      if (isSend) {
        for (let candidate of data) {
          let id = candidate.candidateId;

          for (let article of candidate.articles) {
            Email.sendLog({type: `sendArticle-${article.id}`, candidateId: id})
          }
        }
      };

      if (callback) return callback(isSend)
    })
  }
};

Email.CONFIRMATION_URL = "https://filipvrba-blog.vercel.app/";
window.Email = Email