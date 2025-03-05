export default async function handler(req, res) {
  if (!req.query.id || isNaN(req.query.id)) {
    return res.status(400).json({error: "Invalid or missing article ID"})
  };

  let id = Number(req.query.id);
  let baseUrl = "https://filipvrba-blog.vercel.app";
  let article = await getArticle(baseUrl, id);
  if (!article) return res.status(404).json({error: "Article not found"});
  let rawContent = `# ${article.title}\n\n${article.fullText}`;
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(rawContent)
};

async function getArticle(baseUrl, articleId) {
  let query = `SELECT title, full_text FROM articles WHERE is_published = 1 AND id = ${articleId}`;
  let queryEncode = encodeURIComponent(query);
  let apiUrl = `${baseUrl}/api/bef?query=${queryEncode}`;

  try {
    let response = await fetch(apiUrl);
    if (!response.ok) return null;
    let data = await response.json();
    if (!data && data.length <= 0) return null;

    return {
      title: Buffer.from(data[0].title, "base64").toString("utf-8"),
      fullText: Buffer.from(data[0].full_text, "base64").toString("utf-8")
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return null
  }
}