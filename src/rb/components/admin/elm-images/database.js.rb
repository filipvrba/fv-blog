import 'Net', '../../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_images(&callback)
    query = "SELECT f.id, f.name, f.description, (SELECT COUNT(*) " +
      "FROM file_parts fp WHERE fp.file_id = f.id) AS total_parts " +
      "FROM files f WHERE f.user_id = #{@parent.user_id} " +
      "AND f.file_type LIKE 'image/%' ORDER BY f.created_at DESC;"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        callback(rows) if callback
      else
        callback(nil) if callback
      end
      
    end
  end

  def remove_files(id_files = [], &callback)
    unless id_files.length > 0
      return
    end

    query = "DELETE FROM files WHERE id IN (#{id_files.join(', ')});"

    Net.bef(query) do |message|
      callback(message) if callback
    end
  end

  def save_file(options, &callback)
    description = options.description ? "'#{options.description.encode_base64()}'" : 'NULL'
    query_new_file = "INSERT INTO files (name, description, file_type, user_id) " +
      "VALUES ('#{options.name.encode_base64()}', #{description}, '#{options.file_type}', #{@parent.user_id});"

    callback({token: :t_pre_file}) if callback
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
end