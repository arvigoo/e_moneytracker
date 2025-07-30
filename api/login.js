export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.body
  const validToken = process.env.AUTH_TOKEN

  if (token === validToken) {
    return res.status(200).json({ success: true })
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
