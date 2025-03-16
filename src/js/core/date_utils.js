export default class DateUtils {
  static formatDate(strDate) {
    let date = new Date(strDate);
    let day = date.getUTCDate().toString().padStart(2, "0");
    let month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    let year = date.getUTCFullYear();
    let formattedate = `${day}. ${month}. ${year}`;
    return formattedate
  };

  static convertToCzechHour(utcHour) {
    let now = new Date();
    now.setUTCHours(utcHour, 0, 0, 0);

    return now.toLocaleTimeString(
      "cs-CZ",
      {timeZone: "Europe/Prague", hour: "2-digit", minute: "2-digit"}
    )
  }
};

window.DateUtils = DateUtils