import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  addSubscribe(email, callback) {
    let visitorId = localStorage.getItem("visitor_id") || null;
    visitorId = visitorId ? `'${visitorId}'` : "NULL";
    let query = `INSERT INTO subscribers (visitor_id, email) VALUES (${visitorId}, '${email.encodeBase64()}');`;

    return Net.bef(query, (message) => {
      if (message) {
        return this.getNewIdSubscribe(email, (id) => {
          let candidate;

          if (id) {
            candidate = {id, email};
            if (callback) return callback(candidate)
          } else if (callback) {
            return callback(null)
          }
        })
      } else if (callback) {
        return callback(null)
      }
    })
  };

  getNewIdSubscribe(email, callback) {
    let query = `SELECT id FROM subscribers WHERE email = '${email.encodeBase64()}';`;

    return Net.bef(query, (rows) => {
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        return callback(parseInt(rows[0].id))
      } else if (callback) {
        return callback(null)
      }
    })
  }
}