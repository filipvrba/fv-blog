export default class DateUtils
  def self.format_date(str_date)
    date  = Date.new(str_date)
    day   = date.getUTC_date().to_s().pad_start(2, "0")
    month = (date.getUTCMonth() + 1).to_s().pad_start(2, "0")
    year  = date.getUTC_full_year()

    formattedate = "#{day}. #{month}. #{year}"
  end
end
window.DateUtils = DateUtils