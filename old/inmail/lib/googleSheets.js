import { GoogleSpreadsheet } from 'google-spreadsheet'

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID
const CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL
const PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY

const doc = new GoogleSpreadsheet(SPREADSHEET_ID)

export const createReportingSpreadsheet = async (sheetTitle, headers, rows = []) => {
  if (!rows.length) {
    return
  }
  
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    })

    const sheet = await doc.addSheet({
      title: sheetTitle,
      headerValues: headers
    })

    await addRowsOnSheet(sheet, rows)

    // return {
    //   id: sheet.sheetId,
    //   spreadsheetId: SPREADSHEET_ID,
    //   viewUrl: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${sheet.sheetId}?usp=sharing`,
    //   exportUrl: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=xlsx&gid=${sheet.sheetId}`,
    // }

    return sheet
  } catch (e) {
    console.error('Spreadsheet Error:', e)
  }
}

export const addRowsOnSheet = async (sheet, rows) => {
  try {
    await sheet.addRows(rows)
    return sheet
  } catch (e) {
    console.error('Add Rows Error:', e)
  }
}