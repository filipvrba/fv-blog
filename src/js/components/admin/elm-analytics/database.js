import Net from "../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
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