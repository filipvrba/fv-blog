export default async def handler(req, res)
  base_url = 'https://filipvrba-blog.vercel.app'
  articles = await get_article_ids(base_url)
  urls     = articles.map do |article|
    "<url>
      <loc>#{base_url}/api/article/#{article.id}</loc>
      <lastmod>#{Date.new(article['changed_at']).toISO_string()}</lastmod>
    </url>"
  end.join('')

  sitemap  = "<?xml version='1.0' encoding='UTF-8'?>
  <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
    <url><loc>#{base_url}</loc></url>
    #{urls}
  </urlset>"

  res.set_header('Content-Type', 'text/xml')
  res.status(200).send(sitemap)
end

async def get_article_ids(base_url)
  query        = "SELECT id, changed_at FROM articles WHERE is_published = 1 ORDER BY created_at DESC;"
  query_encode = encodeURI_component(query)
  api_url      = "#{base_url}/api/bef?query=#{query_encode}"
  response     = await fetch(api_url)

  unless response.ok
    return []
  end
  
  articles = await response.json()

  return articles
end
