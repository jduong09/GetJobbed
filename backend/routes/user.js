import express from 'express';
import dotenv from 'dotenv';
import { authClient } from './auth.js';

dotenv.config();
const app = express.Router();

app.get('/:user_uuid/messages', async (req, res) => {
  const accessToken = await authClient.credentials.access_token;
  try {  
    const fetchMessageIds = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?access_token=${accessToken}`);
    const objListOfMessageIds = await fetchMessageIds.json();
    
    /* How to test one message intead of all messages */
    /*
    const firstMessageId = await objListOfMessageIds;
    const fetchMessage = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${firstMessageId.id}?access_token=${accessToken.token}`);
    const dataMessage = await fetchMessage.json();
    dataMessage.payload.headers.find(header => header.name === 'From')
    */

    /* This arr will store objects that contain the message From value and messageId value. */
    const arrMessageFromObjs = await Promise.all(objListOfMessageIds.messages.map(async (message) => {
      const fetchMessage = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?access_token=${accessToken}`);
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

export {
  app as userRouter
}