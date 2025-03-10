import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getArtcile(callback) {
    let query = `SELECT file_id, title, full_text, changed_at, is_adult FROM articles WHERE id = ${this._parent.articleId} AND is_published = 1;`;

    if (this._parent.isPreview) {
      query = `SELECT file_id, title, full_text, changed_at, is_adult FROM articles WHERE user_id = (SELECT user_id FROM tokens WHERE token = '${Cookie.get("l-token")}' AND expires_at > CURRENT_TIMESTAMP) AND id = ${this._parent.articleId} AND is_published = 0;`
    };

    return Net.bef(query, (rows) => {
      let articles;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        articles = rows.map(h => ({
          fileId: parseInt(h.file_id) || "",
          title: h.title.decodeBase64(),
          fullText: h.full_text.decodeBase64(),
          changedAt: DateUtils.formatDate(h.changed_at),
          isAdult: h.is_adult === (1).toString()
        }));

        if (callback) return callback(articles[0])
      } else if (callback) {
        return callback(null)
      }
    })
  }
}