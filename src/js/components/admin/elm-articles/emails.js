export default class CEmails {
  constructor(parent) {
    this._parent = parent;
    this._candidates = []
  };

  send(checkedArticles) {
    let publishedArticles = checkedArticles.filter(h => !h.isPublished);
    if (publishedArticles.length <= 0) return;

    return this._parent.cDatabase.getRelevantInfoArticles(
      publishedArticles,

      articles => (
        this.relevantCandidates(publishedArticles, (candidates) => {
          let data = this.getData(articles, candidates);
          if (data.length > 0) return Email.sendNewArticles(data)
        })
      )
    )
  };

  relevantCandidates(checkedArticles, callback) {
    this._candidates = [];

    for (let checkedArticle of checkedArticles) {
      let articleId = checkedArticle.articleId;

      this._parent.cDatabase.getRelevantSubscribeCandidates(
        articleId,

        (candidates) => {
          let article = {articleId, candidates: candidates || []};
          this._candidates.push(article);

          if (this._candidates.length === checkedArticles.length) {
            if (callback) return callback(this._candidates)
          }
        }
      )
    }
  };

  getData(articles, candidates) {
    let emailsHash = {};

    for (let emailEntry of candidates) {
      let articleId = parseInt(emailEntry.articleId);
      let article = articles.find(a => a.id === articleId);

      for (let candidate of emailEntry.candidates) {
        let candidateId = candidate.id;
        let emailAddress = candidate.email;

        if (emailsHash[candidateId]) {
          emailsHash[candidateId].articles.push({
            id: article.id,
            title: article.title,
            shortText: article.shortText
          })
        } else {
          emailsHash[candidateId] = {
            candidateId,
            email: emailAddress,

            articles: [{
              id: article.id,
              title: article.title,
              shortText: article.shortText
            }]
          }
        }
      }
    };

    return Object.values(emailsHash)
  }
}