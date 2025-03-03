import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getAllArticles(callback) {
    let query = "SELECT id, file_id, title, short_text, category, changed_at FROM articles WHERE is_published = 1 ORDER BY created_at DESC;";

    return Net.bef(query, (rows) => {
      let articles;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        articles = rows.map(h => ({
          id: parseInt(h.id),
          fileId: parseInt(h.file_id) || "",
          title: h.title.decodeBase64(),
          shortText: h.short_text.decodeBase64(),
          category: h.category.decodeBase64(),
          changedAt: DateUtils.formatDate(h.changed_at)
        }));

        if (callback) return callback(articles)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}