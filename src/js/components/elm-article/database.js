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
  };

  sendLogVisit(callback) {
    let vi = VisitorTracker.getVisitorInfo();
    let query = `INSERT OR IGNORE INTO article_visits (article_id, visitor_id, device_type, referrer) VALUES (${this._parent.articleId}, '${vi.visitorId}', '${vi.deviceType}', '${vi.referrer.encodeBase64()}');`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  };

  sendLogClick(callback) {
    let visitorId = VisitorTracker.getId();
    let query = `INSERT INTO article_clicks (article_id, visitor_id) VALUES (${this._parent.articleId}, '${visitorId}');`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  }
}