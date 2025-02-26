import 'Net', '../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def save_file(options, &callback)
    description = options.description ? "'#{options.description}'" : 'NULL'
    query_new_file = "INSERT INTO files (name, description, file_type, user_id) " +
      "VALUES ('#{options.name}', #{description}, '#{options.file_type}', #{@parent.user_id});"

    Net.bef(query_new_file) do |msg_new_file|
      if msg_new_file
        callback({token: :t_file}) if callback

        query_file_id = "SELECT last_insert_rowid() as id;"

        Net.bef(query_file_id) do |rows|
          have_rows = rows.length > 0

          if have_rows
            callback({token: :t_file_id}) if callback

            file_id = rows[0].id
            _save_file_parts(file_id, options.segments, callback)
          else
            callback({token: :t_no_file_id}) if callback
          end
        end
      else
        callback({token: :t_no_file}) if callback
      end
    end
  end

  def _save_file_parts(file_id, segments, &callback)
    result_count = 0

    segments.each_with_index do |segment, i|
      index = i + 1

      query = "INSERT INTO file_parts (file_id, part_order, data) " +
      "VALUES (#{file_id}, #{index}, '#{segment}');"

      Net.bef(query) do |message|
        result_count += 1

        if message
          callback({
            token: :t_segment, part_order: index, part_count: segments.length
          }) if callback
        else
          callback({token: :t_no_segment, part_order: index}) if callback
        end

        if result_count == segments.length
          callback({token: :t_segments}) if callback
        end
      end
    end
  end

  def get_base64_image(file_id, &callback)
    query = "SELECT data FROM file_parts " +
      "WHERE file_id = #{file_id} ORDER BY part_order;"
    
    Net.bef(query) do |rows|
      have_rows = rows.length > 0

      if have_rows
        base64_image = rows.map {|h| h.data}.join('')

        callback(base64_image) if callback
      else
        callback(nil) if callback
      end
    end
  end
end