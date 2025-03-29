export default async def handler(req, res)
  if !req.query.id || isNaN(req.query.id)
    return res.status(400).json({ error: "Invalid or missing file ID" })
  end

  id       = Number(req.query.id)
  base_url = "https://filipvrba-blog.vercel.app"
  file     = await get_image(base_url, id)

  unless file
    return res.status(404).json({ error: "Image not found" })
  end

  buffer_file = Buffer.from(file, 'base64')
  res.setHeader('Content-Type', get_mime(file))
  res.status(200).send(buffer_file)
  res.send(raw_content)
end

def get_mime(base64)
  base64.split(';')[0].split(':')[1]
end

async def get_image(base_url, file_id)
  query = "SELECT data FROM file_parts " +
    "WHERE file_id = #{file_id} ORDER BY part_order;"
  query_encode = encodeURIComponent(query)
  api_url = "#{base_url}/api/bef?query=#{query_encode}"

  begin
    response = await fetch(api_url)
    return nil unless response.ok

    data = await response.json()
    return nil unless data || data.length > 0

    base64_file = data.map {|h| h.data}.join('')

    return base64_file
  rescue => error
    console.error("Error fetching image:", error)
    return nil
  end
end
