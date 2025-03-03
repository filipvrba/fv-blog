export default async function handler(req, res) {
  let baseUrl = "https://filipvrba-blog.vercel.app";
  let articles = await getArticleIds(baseUrl);

  let urls = articles.map(article => (
    `<url>\n        <loc>${baseUrl}/article/${article.id}</loc>\n        <lastmod>${new Date(article.changed_at).toISOString()}</lastmod>\n    </url>`
  )).join("");

  let sitemap = `<?xml version='1.0' encoding='UTF-8'?>
  <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
      <url><loc>${baseUrl}</loc></url>
      ${urls}
  </urlset>`;
  res.setHeader("Content-Type", "text/xml");
  return res.status(200).send(sitemap)
};

async function getArticleIds(baseUrl) {
  let query = "SELECT id, changed_at FROM articles WHERE is_published = 1 ORDER BY created_at DESC;";
  let queryEncode = encodeURIComponent(query);
  let apiUrl = `${baseUrl}/api/bef?query=${queryEncode}`;
  let response = await fetch(apiUrl);
  if (!response.ok) return [];
  let articles = await response.json();
  return articles
}