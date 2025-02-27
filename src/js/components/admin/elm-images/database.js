import Net from "../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  getImages(callback) {
    let query = `SELECT id, name, description FROM files WHERE user_id = ${this._parent.userId} AND file_type LIKE 'image/%';`;

    return Net.bef(query, (rows) => {
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        if (callback) return callback(rows)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  removeFiles(idFiles=[], callback) {
    if (idFiles.length <= 0) return;
    let query = `DELETE FROM files WHERE id IN (${idFiles.join(", ")});`;

    return Net.bef(query, (message) => {
      if (callback) return callback(message)
    })
  };

  saveFile(options, callback) {
    let description = options.description ? `'${options.description.encodeBase64()}'` : "NULL";
    let queryNewFile = `INSERT INTO files (name, description, file_type, user_id) VALUES ('${options.name.encodeBase64()}', ${description}, '${options.fileType}', ${this._parent.userId});`;
    if (callback) callback({token: "tPreFile"});

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
  }
}