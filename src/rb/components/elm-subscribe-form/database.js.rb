import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def add_subscribe(email, &callback)
    visitor_id = local_storage.get_item('visitor_id') || nil
    visitor_id = visitor_id ? "'#{visitor_id}'" : 'NULL'

    query = "INSERT INTO subscribers (visitor_id, email) " +
      "VALUES (#{visitor_id}, '#{email.encode_base64()}');"
      
    Net.bef(query) do |message|

      if message
        get_new_id_subscribe(email) do |id|

          if id
            candidate = {
              id: id,
              email: email,
            }
            callback(candidate) if callback
          else
            callback(nil) if callback
          end
        end
      else
        callback(nil) if callback
      end
    end
  end

  def get_new_id_subscribe(email, &callback)
    query = "SELECT id FROM subscribers WHERE email = '#{email.encode_base64()}';"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        callback(rows.first.id.to_i)
      else
        callback(nil) if callback
      end
    end
  end
end