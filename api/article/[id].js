export default async function handler(req, res) {
  let id = req.query.id;
  if (!id) return res.status(400).json({message: "Missing article ID"});
  let redirectUrl = `https://filipvrba-blog.vercel.app/?aid=${id}#article`;
  return res.redirect(301, redirectUrl)
}