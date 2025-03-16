export default class DateUtils
  def self.format_date(str_date)
    date  = Date.new(str_date)
    day   = date.getUTC_date().to_s().pad_start(2, "0")
    month = (date.getUTCMonth() + 1).to_s().pad_start(2, "0")
    year  = date.getUTC_full_year()

    formattedate = "#{day}. #{month}. #{year}"
  end

  def self.convert_to_czech_hour(utc_hour)
    now = Date.new()
    now.setUTC_hours(utc_hour, 0, 0, 0)

    return now.to_locale_time_string("cs-CZ", { 
      time_zone: "Europe/Prague",
      hour: "2-digit",
      minute: "2-digit"
    })
  end

end
window.DateUtils = DateUtils