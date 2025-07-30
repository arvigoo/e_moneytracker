export default async function handler(req, res) {
  // Tambahkan header CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Tangani preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { username, password } = req.body

  // Ambil user dari env
  const users = [
    {
      username: process.env.USERNAME_1,
      password: process.env.PASSWORD_1
    },
    {
      username: process.env.USERNAME_2,
      password: process.env.PASSWORD_2
    }
  ]

  const isValid = users.some(
    (user) => user.username === username && user.password === password
  )

  if (isValid) {
    return res.status(200).json({ success: true })
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
