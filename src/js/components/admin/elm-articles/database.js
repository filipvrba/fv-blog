import Net from "../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getInfoArticles(callback) {
    let query = `SELECT a.id, a.title, a.category, a.is_published FROM articles a JOIN users u ON a.user_id = u.id WHERE a.user_id = ${this._parent.userId};`;

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
  }
}