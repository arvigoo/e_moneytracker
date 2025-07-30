import { google } from 'googleapis'

export default async function handler(req, res) {
  // ✅ Tambahkan CORS header
  res.setHeader('Access-Control-Allow-Origin', '*') // atau ganti * dengan domain tertentu
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // ✅ Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const sheetId = process.env.GOOGLE_SHEET_ID
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SHEETS_CREDENTIALS_BASE64, 'base64').toString()
  )

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  if (req.method === 'GET') {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Data!A2:O',
    })
    const rows = response.data.values || []
    return res.status(200).json({ data: rows })
  }

  if (req.method === 'POST') {
    const { data } = req.body

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Data!A2',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [data],
      },
    })

    return res.status(200).json({ success: true })
  }

  return res.status(405).end('Method not allowed')
}
