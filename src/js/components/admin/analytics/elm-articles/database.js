import Net from "../../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getCountArticles(callback) {
    let queryWhereFilter = this._parent.filterDate ? `WHERE ac.clicked_at >= '${this._parent.filterDate}'` : "";
    let queryWhereFilterTwo = this._parent.filterDate ? `AND av.visited_at >= '${this._parent.filterDate}'` : "";
    let query = `SELECT 
    a.id, 
    a.title, 
    COUNT(DISTINCT av.id) AS article_count, 
    COUNT(DISTINCT ac.id) AS click_count, 
    ROUND(CAST(COUNT(DISTINCT ac.id) AS FLOAT) / NULLIF(COUNT(DISTINCT av.id), 0), 2) AS conversion_rate 
FROM articles a
INNER JOIN article_visits av ON a.id = av.article_id
LEFT JOIN article_clicks ac ON a.id = ac.article_id
${queryWhereFilter} ${queryWhereFilterTwo}
GROUP BY a.id, a.title
ORDER BY article_count DESC;
`;

    if (this._parent.hour) {
      let hour = DateUtils.convertToDefaultHour(this._parent.hour);

      query = `SELECT 
    a.id,
    a.title,
    COUNT(ac.id) AS click_count
FROM 
    article_clicks ac
JOIN 
    articles a ON ac.article_id = a.id
WHERE 
    strftime('%H', ac.clicked_at) = '${hour}' ${queryWhereFilter.replace(
        "WHERE",
        "AND"
      )}
GROUP BY 
    a.id, a.title
ORDER BY 
    click_count DESC;`
    };

    return Net.bef(query, (rows) => {
      let articles;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        articles = rows.map(h => ({
          id: parseInt(h.id),
          title: h.title.decodeBase64(),
          count: parseInt(h.article_count),
          clickCount: parseInt(h.click_count),
          conversionRate: h.conversion_rate
        }));

        if (callback) return callback(articles)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}