export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.body
  const validToken = process.env.AUTH_TOKEN

  console.log('ENV TOKEN:', validToken) // ← Debug log

  if (token === validToken) {
    return res.status(200).json({ success: true })
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
