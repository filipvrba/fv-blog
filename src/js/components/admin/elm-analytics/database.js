import Net from "../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getCountArticles(callback) {
    let query = `SELECT 
    a.title,
    COUNT(av.article_id) AS article_count
FROM articles a
INNER JOIN article_visits av ON a.id = av.article_id
GROUP BY a.id
ORDER BY article_count DESC;
`;

    return Net.bef(query, (rows) => {
      let articles;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        articles = rows.map(h => ({
          title: h.title.decodeBase64(),
          count: parseInt(h.article_count)
        }));

        if (callback) return callback(articles)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  getCountReferrer(callback) {
    let query = `SELECT 
    av.referrer,
    COUNT(av.referrer) AS referrer_count
FROM article_visits av
WHERE av.referrer IS NOT NULL
GROUP BY av.referrer
ORDER BY referrer_count DESC;
`;

    return Net.bef(query, (rows) => {
      let referrer;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        referrer = rows.map(h => ({
          referrer: h.referrer.decodeBase64(),
          count: parseInt(h.referrer_count)
        }));

        if (callback) return callback(referrer)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  getCountDevices(callback) {
    let query = `SELECT 
    av.device_type,
    COUNT(av.device_type) AS device_count
FROM article_visits av
GROUP BY av.device_type
ORDER BY device_count DESC;
`;

    return Net.bef(query, (rows) => {
      let devices;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        devices = rows.map(h => ({
          type: h.device_type,
          count: parseInt(h.device_count)
        }));

        if (callback) return callback(devices)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}