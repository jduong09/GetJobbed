import express from 'express';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();
const app = express.Router();

const { gmailClientId, gmailClientSecret, gmailRedirectUrl } = process.env;

const oauth2Client = new google.auth.OAuth2(
  gmailClientId,
  gmailClientSecret,
  gmailRedirectUrl
);

// https://www.googleapis.com/auth/gmail.addons.current.message.readonly
// https://www.googleapis.com/auth/gmail.addons.current.message.action
// https://gmail.googleapis.com/gmail/v1/users/{userId}/messages
const scopes = [
  'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
  'https://www.googleapis.com/auth/gmail.addons.current.message.action',
]

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

app.get('/auth', (req, res) => {
  console.log('Hit Auth Route');
  res.location(url);
  /*
  try {
    const response = await fetch(url).then(response => response);
    console.log(response);
  } catch(err) {
    console.log(err);
  }
  */
});

// After user has authenticated GetJobbed to access the provided scopes, redirect to this endpoint.
app.get('/auth/redirect', async (req, res) => {
  // receive accessToken
  const { tokens } = await oauth2Client.getToken(req.query.code);
  console.log(tokens);
  oauth2Client.setCredentials(tokens);
})

export { app as gmailRouter };