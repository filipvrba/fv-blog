import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_candidate(&callback)
    query = "SELECT email FROM subscribers WHERE id = #{@parent.candidate_id};"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        data = rows.map do |h|
          {
            email: h.email.decode_base64()
          }
        end

        callback(data.first) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def remove_candidate(&callback)
    query = "DELETE FROM subscribers WHERE id = #{@parent.candidate_id};"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end
end