import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getCandidate(callback) {
    let query = `SELECT email FROM subscribers WHERE id = ${this._parent.candidateId};`;

    return Net.bef(query, (rows) => {
      let data;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        data = rows.map(h => ({email: h.email.decodeBase64()}));
        if (callback) return callback(data[0])
      } else if (callback) {
        return callback(null)
      }
    })
  };

  removeCandidate(callback) {
    let query = `DELETE FROM subscribers WHERE id = ${this._parent.candidateId};`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  }
}