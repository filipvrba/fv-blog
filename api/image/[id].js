export default async function handler(req, res) {
  if (!req.query.id || isNaN(req.query.id)) {
    return res.status(400).json({error: "Invalid or missing file ID"})
  };

  let id = Number(req.query.id);
  let baseUrl = "https://filipvrba-blog.vercel.app";
  let file = await getFile(baseUrl, id);
  if (!file) return res.status(404).json({error: "Image not found"});
  let bufferFile = Buffer.from(file, "base64");
  res.setHeader("Content-Type", getMime(file));
  res.status(200).send(image);
  return res.send(rawContent)
};

function getMime(base64) {
  return base64.split(";")[0].split(":")[1]
};

async function getImage(baseUrl, fileId) {
  let query = `SELECT data FROM file_parts WHERE file_id = ${fileId} ORDER BY part_order;`;
  let queryEncode = encodeURIComponent(query);
  let apiUrl = `${baseUrl}/api/bef?query=${queryEncode}`;

  try {
    let response = await fetch(apiUrl);
    if (!response.ok) return null;
    let data = await response.json();
    if (!data && data.length <= 0) return null;
    let base64File = data.map(h => h.data).join("");
    return base64File
  } catch (error) {
    console.error("Error fetching image:", error);
    return null
  }
}