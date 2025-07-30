export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.body
  const expected = process.env.AUTH_TOKEN

  if (token === expected) {
    return res.status(200).json({ success: true })
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
