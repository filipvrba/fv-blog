export default async def handler(req, res)
  if !req.query.id || isNaN(req.query.id)
    return res.status(400).json({ error: "Invalid or missing article ID" })
  end

  id       = Number(req.query.id)
  base_url = "https://filipvrba-blog.vercel.app"
  article  = await getArticle(base_url, id)

  unless article
    return res.status(404).json({ error: "Article not found" })
  end

  raw_content = "# #{article.title}\n\n#{article.full_text}"
  res.set_header("Content-Type", "text/markdown")
  res.send(raw_content)
end

async def get_article(base_url, article_id)
  query = "SELECT title, full_text FROM articles WHERE is_published = 1 AND id = #{article_id}"
  query_encode = encodeURIComponent(query)
  api_url = "#{base_url}/api/bef?query=#{query_encode}"

  begin
    response = await fetch(api_url)
    return nil unless response.ok

    data = await response.json()
    return nil unless data || data.length > 0

    return {
      title: Buffer.from(data.first.title, "base64").to_s("utf-8"),
      full_text: Buffer.from(data.first.full_text, "base64").to_s("utf-8"),
    }
  rescue => error
    console.error("Error fetching article:", error)
    return nil
  end
end
