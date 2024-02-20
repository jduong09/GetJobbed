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

const scopes = [
  'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
  'https://www.googleapis.com/auth/gmail.addons.current.message.action',
  'https://www.googleapis.com/auth/gmail.readonly'
]

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

app.get('/auth', (req, res) => {
  console.log('Hit Auth Route');
  // console.log(oauth2Client);
  if (!Object.keys(oauth2Client.credentials).length) {
    res.json({ oauthUrl: url });
  } else {
    res.json({ signedIn: true });
  }
});

// After user has authenticated GetJobbed to access the provided scopes, redirect to this endpoint.
app.get('/auth/redirect', async (req, res) => {
  // receive accessToken
  // console.log('Hit Redirect Route');
  const { tokens } = await oauth2Client.getToken(req.query.code);
  // console.log(tokens);
  oauth2Client.setCredentials(tokens);
  res.redirect('http://localhost:5173');
});

app.get('/user/messages', async (req, res) => {
  const accessToken = await oauth2Client.getAccessToken();
  try {  
    const fetchMessageIds = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?access_token=${accessToken.token}`);
    const objListOfMessageIds = await fetchMessageIds.json();
    
    /* How to test one message intead of all messages */
    /*
    const firstMessageId = await objListOfMessageIds;
    const fetchMessage = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${firstMessageId.id}?access_token=${accessToken.token}`);
    const dataMessage = await fetchMessage.json();
    dataMessage.payload.headers.find(header => header.name === 'From')
    */

    /* This arr will store objects that have a from and a to. */
    const arrMessageFromObjs = await Promise.all(objListOfMessageIds.messages.map(async (message) => {
      const fetchMessage = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?access_token=${accessToken.token}`);
      const dataMessage = await fetchMessage.json();
      const resultObj = dataMessage.payload.headers.find(header => header.name === 'From');

      return { ...resultObj, messageId: message.id };
    }));

    console.log(arrMessageFromObjs);
    res.json({ data: 'nice' });
  } catch(err) {
    console.log(err);
    res.json({ data: 'No' });
  }
});

export { app as gmailRouter };