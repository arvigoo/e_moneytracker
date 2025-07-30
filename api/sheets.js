import { google } from 'googleapis'

export default async function handler(req, res) {
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
    // Baca data dari sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Data!A2:O', // Asumsikan header di baris pertama
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
