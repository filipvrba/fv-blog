import Net from "../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getInfoArticles(callback) {
    let query = `SELECT a.id, a.title, a.category FROM articles a JOIN users u ON a.user_id = u.id WHERE a.user_id = ${this._parent.userId};`;

    return Net.bef(query, (rows) => {
      let articles;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        articles = rows.map(h => ({
          id: h.id,
          title: h.title.decodeBase64(),
          category: h.category.decodeBase64()
        }));

        if (callback) return callback(articles)
      } else if (callback) {
        return callback(null)
      }
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