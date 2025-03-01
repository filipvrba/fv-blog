import Net from "../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getBase64File(callback) {
    let query = `SELECT data FROM file_parts WHERE file_id = ${this._parent.fileId} ORDER BY part_order;`;

    return Net.bef(query, (rows) => {
      let base64File;
      let haveRows = rows.length > 0;

      if (haveRows) {
        base64File = rows.map(h => h.data).join("");
        if (callback) return callback(base64File)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  getImage(callback) {
    let query = `SELECT fp.data, f.description FROM file_parts fp JOIN files f ON fp.file_id = f.id WHERE fp.file_id = ${this._parent.fileId} ORDER BY fp.part_order;`;

    return Net.bef(query, (rows) => {
      let base64File, image;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        base64File = rows.map(h => h.data).join("");
        image = {src: base64File, alt: rows[0].description.decodeBase64()};
        if (callback) return callback(image)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}