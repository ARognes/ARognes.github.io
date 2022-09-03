const fs = require('fs');
const { google } = require('googleapis');
require('dotenv').config()

const resumeId = '1pWZyMr6CMDhBaMISAWG7zYhaK6WMKxRhKsb9JU1hY5s'

const KEY = process.env['KEY'].replace(/\\n/g, '\n');
const EMAIL = process.env['EMAIL'];

const SCOPES = ['https://www.googleapis.com/auth/drive'];

async function exportPDF(fileId, dest) {

  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: KEY,
      client_email: EMAIL
    },
    scopes: SCOPES
  });

  const service = google.drive({
    version: 'v3',
    auth
  });
  
  const fsDest = fs.createWriteStream(dest);
  return await service.files.export({
    fileId,
    mimeType: 'application/pdf'
  }, { responseType: 'stream' }, (err, res) => {
    if (err) console.error(err);
    else res.data.on('error', console.error).pipe(fsDest);
  });
}

exportPDF(resumeId, '../Austin Rognes - Resume.pdf');
