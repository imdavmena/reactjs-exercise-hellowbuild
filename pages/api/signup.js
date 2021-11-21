// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function (req, res) {
  if (!req.body) {
    res.status(400).json({ error: "The body its empty" });
    return;
  }
  const { email } = req.body;

  res.status(200).json({ email, ok: true });
}
