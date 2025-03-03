export default async def handler(req, res)
  id = req.query.id

  unless id
    return res.status(400).json({ message: "Missing article ID" })
  end

  redirect_url = "https://filipvrba-blog.vercel.app/?aid=#{id}#article"

  res.redirect(301, redirect_url)
end