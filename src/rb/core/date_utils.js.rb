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

  def self.convert_to_default_hour(czech_hour)
    hours, minutes = czech_hour.split(':')

    now = Date.new()
    now.setUTC_hours(hours.to_i, minutes.to_i, 0, 0)

    date = Intl.DateTimeFormat.new('en-US', {
      timeZone: 'Europe/Prague',
      timeZoneName: 'short',
    }).format(now)
    czech_gmt = date.split(', ').last.sub('GMT', '').to_i

    return now.to_locale_time_string("cs-CZ", {
      time_zone: "Etc/GMT+#{czech_gmt}",
      hour: "2-digit"
    })
  end
end
window.DateUtils = DateUtils