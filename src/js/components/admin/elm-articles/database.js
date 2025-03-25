import Net from "../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getInfoArticles(callback) {
    let query = `SELECT a.id, a.title, a.category, a.is_published FROM articles a JOIN users u ON a.user_id = u.id WHERE a.user_id = ${this._parent.userId} ORDER BY a.created_at DESC;`;

    return Net.bef(query, (rows) => {
      let articles;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        articles = rows.map(h => ({
          id: h.id,
          title: h.title.decodeBase64(),
          category: h.category.decodeBase64(),
          isPublished: h.is_published === (1).toString()
        }));

        if (callback) return callback(articles)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  getRelevantInfoArticles(checkedArticles, callback) {
    if (checkedArticles.length <= 0) return;
    let whereIds = checkedArticles.map(h => h.articleId);
    let query = `SELECT id, title, short_text FROM articles WHERE id IN (${whereIds.join(", ")});`;

    return Net.bef(query, (rows) => {
      let articles;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        articles = rows.map(h => ({
          id: parseInt(h.id),
          title: h.title.decodeBase64(),
          shortText: h.short_text.decodeBase64()
        }));

        if (callback) return callback(articles)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  setVisibilityArticle(checkedArticles, callback) {
    if (checkedArticles.length <= 0) return;

    let caseIds = checkedArticles.map(h => (
      `WHEN id = ${h.articleId} THEN ${h.isPublished ? 0 : 1}`
    ));

    let whereIds = checkedArticles.map(h => h.articleId);
    let query = `UPDATE articles SET is_published = CASE ${caseIds.join(" ")} ELSE is_published END WHERE id IN (${whereIds.join(", ")});`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  };

  removeArticle(idArticles, callback) {
    if (idArticles.length <= 0) return;
    let query = `DELETE FROM articles WHERE id IN (${idArticles.join(", ")});`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  };

  getRelevantSubscribeCandidates(articleId, callback) {
    let query = `SELECT s.id, s.email
      FROM subscribers s
      WHERE s.id NOT IN (
        SELECT sl.subscriber_id
        FROM subscriber_email_logs sl
        WHERE sl.email_type LIKE 'sendArticle-%'
        AND sl.email_type LIKE 'sendArticle-${articleId}%'
      );`;

    return Net.bef(query, (rows) => {
      let candidates;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        candidates = rows.map(h => ({
          id: parseInt(h.id),
          email: h.email.decodeBase64()
        }));

        if (callback) return callback(candidates)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}