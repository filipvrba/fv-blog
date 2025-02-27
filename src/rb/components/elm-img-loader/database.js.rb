import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_base64_file(&callback)
    query = "SELECT data FROM file_parts " +
      "WHERE file_id = #{@parent.file_id} ORDER BY part_order;"
    
    Net.bef(query) do |rows|
      have_rows = rows.length > 0

      if have_rows
        base64_file = rows.map {|h| h.data}.join('')

        callback(base64_file) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def get_image(&callback)
    query = "SELECT fp.data, f.description FROM file_parts fp " +
      "JOIN files f ON fp.file_id = f.id " +
      "WHERE fp.file_id = #{@parent.file_id} ORDER BY fp.part_order;"

    Net.bef(query) do |rows|
      have_rows = rows.length > 0

      if have_rows
        base64_file = rows.map {|h| h.data}.join('')
        image = {
          src: base64_file, alt: rows[0].description.decode_base64()
        }
        callback(image) if callback
      else
        callback(nil) if callback
      end
    end
  end
end