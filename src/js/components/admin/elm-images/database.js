import Net from "../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  saveFile(options, callback) {
    let description = options.description ? `'${options.description}'` : "NULL";
    let queryNewFile = `INSERT INTO files (name, description, file_type, user_id) VALUES ('${options.name}', ${description}, '${options.fileType}', ${this._parent.userId});`;

    return Net.bef(queryNewFile, (msgNewFile) => {
      let queryFileId;

      if (msgNewFile) {
        if (callback) callback({token: "tFile"});
        queryFileId = "SELECT last_insert_rowid() as id;";

        return Net.bef(queryFileId, (rows) => {
          let fileId;
          let haveRows = rows.length > 0;

          if (haveRows) {
            if (callback) callback({token: "tFileId"});
            fileId = rows[0].id;
            return this._saveFileParts(fileId, options.segments, callback)
          } else if (callback) {
            return callback({token: "tNoFileId"})
          }
        })
      } else if (callback) {
        return callback({token: "tNoFile"})
      }
    })
  };

  _saveFileParts(fileId, segments, callback) {
    let resultCount = 0;

    return segments.forEach((segment, i) => {
      let index = i + 1;
      let query = `INSERT INTO file_parts (file_id, part_order, data) VALUES (${fileId}, ${index}, '${segment}');`;

      return Net.bef(query, (message) => {
        resultCount++;

        if (message) {
          if (callback) {
            callback({
              token: "tSegment",
              partOrder: index,
              partCount: segments.length
            })
          }
        } else if (callback) {
          callback({token: "tNoSegment", partOrder: index})
        };

        if (resultCount === segments.length) {
          if (callback) return callback({token: "tSegments"})
        }
      })
    })
  };

  getBase64Image(fileId, callback) {
    let query = `SELECT data FROM file_parts WHERE file_id = ${fileId} ORDER BY part_order;`;

    return Net.bef(query, (rows) => {
      let base64Image;
      let haveRows = rows.length > 0;

      if (haveRows) {
        base64Image = rows.map(h => h.data).join("");
        if (callback) return callback(base64Image)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}