import express from 'express';
import dotenv from 'dotenv';
import { authClient } from './auth.js';

dotenv.config();
const app = express.Router();

app.get('/:user_uuid/messages', async (req, res) => {
  res.end();
  /*
  const accessToken = await authClient.credentials.access_token;
  try {  
    const fetchMessageIds = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?access_token=${accessToken}`);
    const objListOfMessageIds = await fetchMessageIds.json();
    
    const arrMessageFromObjs = await Promise.all(objListOfMessageIds.messages.map(async (message) => {
      const fetchMessage = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?access_token=${accessToken}`);
      const dataMessage = await fetchMessage.json();
      const resultObj = dataMessage.payload.headers.find(header => header.name === 'From');

      return { ...resultObj, messageId: message.id };
    }));

    // console.log(arrMessageFromObjs);
    res.json({ data: 'nice' });
  } catch(err) {
    console.log(err);
    res.json({ data: 'No' });
  }
  */
});

export {
  app as userRouter
}