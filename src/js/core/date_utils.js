export default class DateUtils {
  static formatDate(strDate) {
    let date = new Date(strDate);
    let day = date.getUTCDate().toString().padStart(2, "0");
    let month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    let year = date.getUTCFullYear();
    let formattedate = `${day}. ${month}. ${year}`;
    return formattedate
  }
};

window.DateUtils = DateUtils