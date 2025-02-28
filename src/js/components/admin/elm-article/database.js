import Net from "../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  saveArticle(options, callback) {
    let fileId = options.imageId === (0).toString() ? "NULL" : options.imageId;
    let title = options.title.encodeBase64();
    let category = options.category.encodeBase64();
    let shortText = options.text.shortenText().encodeBase64();
    let fullText = options.text.encodeBase64();
    let isAdult = options.isAdult ? 1 : 0;
    let query = `INSERT INTO articles (user_id, file_id, title, category, short_text, full_text, is_adult) VALUES (${this._parent.userId}, ${fileId}, '${title}', '${category}', '${shortText}', '${fullText}', ${isAdult});`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  };

  updateArticle(options, callback) {
    let fileId = options.imageId === (0).toString() ? "NULL" : options.imageId;
    let title = options.title.encodeBase64();
    let category = options.category.encodeBase64();
    let shortText = options.text.shortenText().encodeBase64();
    let fullText = options.text.encodeBase64();
    let isAdult = options.isAdult ? 1 : 0;
    let query = `UPDATE articles SET file_id = ${fileId}, title = '${title}', category = '${category}', short_text = '${shortText}', full_text = '${fullText}', is_adult = ${isAdult} WHERE id = ${this._parent.articleId};`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  };

  getArticle(callback) {
    let query = `SELECT file_id, title, category, full_text, is_adult FROM articles WHERE id = ${this._parent.articleId};`;

    return Net.bef(query, (rows) => {
      let articles;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        articles = rows.map(h => ({
          fileId: parseInt(h.file_id) || 0,
          title: h.title.decodeBase64(),
          category: h.category.decodeBase64(),
          fullText: h.full_text.decodeBase64(),
          isAdult: h.is_adult === (1).toString()
        }));

        if (callback) return callback(articles[0])
      } else if (callback) {
        return callback(null)
      }
    })
  }
}