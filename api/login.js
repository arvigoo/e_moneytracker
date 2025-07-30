export default async function handler(req, res) {
  // --- Tambahkan CORS Header ---
  res.setHeader('Access-Control-Allow-Origin', '*') // Atau ganti dengan domain kamu
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // --- Tangani Preflight Request ---
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // --- Tangani POST Login ---
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
