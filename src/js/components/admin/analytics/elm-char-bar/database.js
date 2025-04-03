import Net from "../../../../core/net";

export default class CDatabase {
  constructor(parent) {
    this._parent = parent
  };

  clicksPerHour(callback) {
    let queryWhereFilter = this._parent.filterDate ? `WHERE clicked_at >= '${this._parent.filterDate}'` : "";
    let query = `SELECT strftime('%H', clicked_at) AS hour, COUNT(*) AS click_count
      FROM article_clicks
      ${queryWhereFilter}
      GROUP BY hour
      ORDER BY hour;`;

    return Net.bef(query, (rows) => {
      let data;
      let haveRows = rows && rows.length > 0;

      if (haveRows) {
        data = rows.map(h => ({
          hour: parseInt(h.hour),
          clickCount: parseInt(h.click_count)
        }));

        if (callback) return callback(data)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  charData(rows) {
    return {
      labels: rows.map(row => DateUtils.convertToCzechHour(row.hour)),

      datasets: [{
        label: "Počet kliknutí za hodinu",
        data: rows.map(row => row.clickCount),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    }
  }
}